/**
 * Generates tiny base64 placeholder images for blur-up effect.
 * Scans static/projects for image files and creates a JSON manifest.
 *
 * Usage:
 *   node scripts/generate-placeholders.js
 *   node scripts/generate-placeholders.js --force
 *   node scripts/generate-placeholders.js --dry-run
 *
 * Output:
 *   static/placeholders.json - Map of image paths to base64 placeholders
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
	staticDir: 'static',
	outputFile: 'static/placeholders.json',
	cacheFile: 'node_modules/.cache/placeholder-cache.json',
	imageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
	placeholderWidth: 16, // Tiny placeholder for blur-up
	quality: 20
};

// ==========================================
// 2. STYLE & LOGGING
// ==========================================
const STYLE = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	cyan: '\x1b[36m',
	magenta: '\x1b[35m'
};

const fmt = (color, text) => `${STYLE[color]}${text}${STYLE.reset}`;

const Logger = {
	header: (force, dry) => {
		console.log(`\n${fmt('bright', 'Placeholder Generator')}`);
		console.log(
			`   Force:     ${force ? fmt('yellow', 'YES (Regenerate All)') : fmt('dim', 'NO')}`
		);
		console.log(`   Mode:      ${dry ? fmt('magenta', 'DRY RUN') : fmt('green', 'LIVE')}\n`);
	},
	skip: (name, reason) =>
		console.log(`   ${fmt('dim', '[SKIP]')} ${name} ${fmt('dim', `(${reason})`)}`),
	process: (relPath, dry) => {
		const tag = dry ? fmt('magenta', '[DRY]') : fmt('green', '[GEN]');
		process.stdout.write(`   ${tag} ${relPath}... `);
	},
	success: () => console.log(fmt('green', 'OK')),
	fail: (err) => console.log(`${fmt('red', 'FAILED')} ${err || ''}`),
	summary: (generated, skipped, total) => {
		console.log(`\n${fmt('dim', '────────────────────────────────────────────────')}`);
		console.log(`   Generated: ${fmt('green', generated)}`);
		console.log(`   Skipped:   ${fmt('dim', skipped)}`);
		console.log(`   Total:     ${fmt('cyan', total)}`);
		console.log(`${fmt('dim', '────────────────────────────────────────────────')}\n`);
	}
};

// ==========================================
// 3. FILE UTILITIES
// ==========================================

/**
 * Recursively find all image files in a directory
 */
function findImages(dir, images = []) {
	if (!existsSync(dir)) return images;

	const entries = readdirSync(dir);
	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			findImages(fullPath, images);
		} else if (CONFIG.imageExtensions.includes(extname(entry).toLowerCase())) {
			images.push(fullPath);
		}
	}
	return images;
}

/**
 * Get file modification time for cache invalidation
 */
function getFileMtime(filePath) {
	try {
		return statSync(filePath).mtimeMs;
	} catch {
		return 0;
	}
}

/**
 * Load cache from disk
 */
function loadCache() {
	try {
		if (existsSync(CONFIG.cacheFile)) {
			return JSON.parse(readFileSync(CONFIG.cacheFile, 'utf-8'));
		}
	} catch {
		// Ignore cache read errors
	}
	return {};
}

/**
 * Save cache to disk
 */
function saveCache(cache) {
	const cacheDir = join(CONFIG.cacheFile, '..');
	if (!existsSync(cacheDir)) {
		mkdirSync(cacheDir, { recursive: true });
	}
	writeFileSync(CONFIG.cacheFile, JSON.stringify(cache, null, 2));
}

/**
 * Check if sharp is available, fall back to ffmpeg
 */
function checkDependencies() {
	try {
		execSync('npx sharp --version', { stdio: 'ignore' });
		return 'sharp';
	} catch {
		try {
			execSync('ffmpeg -version', { stdio: 'ignore' });
			return 'ffmpeg';
		} catch {
			console.error(fmt('red', 'Error: Neither sharp nor ffmpeg found.'));
			console.error('Install sharp: npm install sharp');
			console.error('Or install ffmpeg: https://ffmpeg.org/download.html');
			process.exit(1);
		}
	}
}

// ==========================================
// 4. PLACEHOLDER GENERATION
// ==========================================

/**
 * Generate base64 placeholder using sharp CLI
 */
function generateWithSharp(imagePath) {
	const result = execSync(
		`npx sharp -i "${imagePath}" -o - --format png resize ${CONFIG.placeholderWidth}`,
		{ encoding: 'buffer', maxBuffer: 1024 * 1024 }
	);
	return `data:image/png;base64,${result.toString('base64')}`;
}

/**
 * Generate base64 placeholder using ffmpeg
 * Cross-platform: uses stdio options instead of shell redirection
 */
function generateWithFfmpeg(imagePath) {
	const result = execSync(
		`ffmpeg -i "${imagePath}" -vf "scale=${CONFIG.placeholderWidth}:-1" -f image2pipe -vcodec png -`,
		{ encoding: 'buffer', maxBuffer: 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }
	);
	return `data:image/png;base64,${result.toString('base64')}`;
}

/**
 * Generate placeholder for a single image
 */
function generatePlaceholder(imagePath, tool) {
	try {
		if (tool === 'sharp') {
			return generateWithSharp(imagePath);
		} else {
			return generateWithFfmpeg(imagePath);
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

// ==========================================
// 5. MAIN EXECUTION
// ==========================================

function main() {
	// Parse CLI arguments
	const args = process.argv.slice(2);
	const force = args.includes('--force');
	const dryRun = args.includes('--dry-run');

	Logger.header(force, dryRun);

	// Check dependencies
	const tool = checkDependencies();
	console.log(`   Using:     ${fmt('cyan', tool)}\n`);

	// Find all images
	const images = findImages(CONFIG.staticDir);
	if (images.length === 0) {
		console.log(fmt('yellow', '   No images found in static/'));
		return;
	}

	// Load existing placeholders and cache
	let placeholders = {};
	let cache = {};

	if (!force) {
		try {
			if (existsSync(CONFIG.outputFile)) {
				placeholders = JSON.parse(readFileSync(CONFIG.outputFile, 'utf-8'));
			}
		} catch {
			// Start fresh if JSON is invalid
		}
		cache = loadCache();
	}

	let generated = 0;
	let skipped = 0;

	for (const imagePath of images) {
		// Convert to URL path (e.g., "static/projects/foo.avif" -> "/projects/foo.avif")
		const urlPath = '/' + relative(CONFIG.staticDir, imagePath).replace(/\\/g, '/');
		const mtime = getFileMtime(imagePath);

		// Check if we can skip this image
		if (!force && cache[urlPath] === mtime && placeholders[urlPath]) {
			Logger.skip(urlPath, 'cached');
			skipped++;
			continue;
		}

		Logger.process(urlPath, dryRun);

		if (dryRun) {
			Logger.success();
			generated++;
			continue;
		}

		try {
			const base64 = generatePlaceholder(imagePath, tool);
			placeholders[urlPath] = base64;
			cache[urlPath] = mtime;
			Logger.success();
			generated++;
		} catch (error) {
			Logger.fail(error.message);
		}
	}

	// Write outputs
	if (!dryRun) {
		writeFileSync(CONFIG.outputFile, JSON.stringify(placeholders, null, 2));
		saveCache(cache);
		console.log(`\n   ${fmt('green', '✓')} Written to ${fmt('cyan', CONFIG.outputFile)}`);
	}

	Logger.summary(generated, skipped, images.length);
}

main();
