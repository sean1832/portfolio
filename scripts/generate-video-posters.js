/**
 * Scans static/projects for video files and generates WebP posters.
 * Uses a centralized cache file to support incremental builds.
 *
 * Usage:
 * node scripts/generate-posters.js --target on-country
 * node scripts/generate-posters.js --force
 * node scripts/generate-posters.js --dry-run
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename, relative, dirname, resolve } from 'node:path';

// ==========================================
// 1. STYLE & LOGGING UTILS
// ==========================================
const STYLE = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	cyan: '\x1b[36m',
	magenta: '\x1b[35m',
	blue: '\x1b[34m'
};

const fmt = (color, text) => `${STYLE[color]}${text}${STYLE.reset}`;

const Logger = {
	header: (scope, ext, force, dry) => {
		console.log(`\n${fmt('bright', 'Poster Generator (Incremental)')}`);
		console.log(`   Scope:     ${fmt('cyan', scope)}`);
		console.log(`   Ext:       ${fmt('cyan', ext)}`);
		console.log(
			`   Force:     ${force ? fmt('yellow', 'YES (Ignoring Cache)') : fmt('dim', 'NO')}`
		);
		console.log(`   Mode:      ${dry ? fmt('magenta', 'DRY RUN') : fmt('green', 'LIVE')}\n`);
	},
	skip: (name, reason) =>
		console.log(`${fmt('dim', '   [SKIP]')} ${name} ${fmt('dim', `(${reason})`)}`),
	process: (relPath, dry) => {
		const tag = dry ? fmt('magenta', '[DRY]') : fmt('green', '[GEN]');
		process.stdout.write(`   ${tag} ${relPath}... `);
	},
	success: (dry) => console.log(dry ? fmt('cyan', '(simulated)') : fmt('green', 'DONE')),
	fail: (err) => console.log(`${fmt('red', 'FAILED')} ${err || ''}`),
	summary: (stats) => {
		console.log(`\n${fmt('dim', '------------------------------------------------')}`);
		console.log(
			`   Processed: ${stats.processed} | Skipped: ${stats.skipped} | Errors: ${stats.errors}`
		);
		console.log(`${fmt('dim', '------------------------------------------------')}\n`);
	}
};

// ==========================================
// 2. CONFIGURATION & ARGS
// ==========================================
const CONFIG = {
	baseDir: 'static/projects',
	cacheFile: 'node_modules/.cache/poster-cache.json', // Cache
	ffmpegCmd: 'ffmpeg',
	ffmpegArgs: (input, output) => [
		'-y',
		'-i',
		input,
		'-ss',
		'00:00:00',
		'-vframes',
		'1',
		'-c:v',
		'libwebp',
		'-q:v',
		'75',
		'-an',
		output
	]
};

const getArg = (flag, fallback) => {
	const idx = process.argv.indexOf(flag);
	return idx > -1 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
};

const OPTIONS = {
	ext: getArg('--ext', '.mp4'),
	target: getArg('--target', ''),
	force: process.argv.includes('--force') || process.argv.includes('--overwrite'),
	dryRun: process.argv.includes('--dry-run')
};

// ==========================================
// 3. CACHE SYSTEM
// ==========================================
const Cache = {
	data: {},
	path: resolve(CONFIG.cacheFile),

	load() {
		try {
			if (existsSync(this.path)) {
				this.data = JSON.parse(readFileSync(this.path, 'utf-8'));
			}
		} catch (e) {
			console.warn(fmt('yellow', `[WARN] Cache file corrupted, rebuilding: ${e.message}`));
			this.data = {}; // Reset on corruption
		}
	},

	save() {
		if (OPTIONS.dryRun) return;
		try {
			writeFileSync(this.path, JSON.stringify(this.data, null, 2));
		} catch (e) {
			console.error(fmt('red', `[WARN] Could not save cache: ${e.message}`));
		}
	},

	/**
	 * Generates a signature for the file.
	 * Strategy: FileSize + MTime.
	 * Note: For pure content hashing (slower but strictly robust), read the file buffer.
	 */
	getSignature(filePath) {
		const stat = statSync(filePath);
		// Combine size and last modified time (ms) for a unique signature
		return `${stat.size}-${stat.mtimeMs}`;

		// STRICT CONTENT HASH (Slower for large files)
		// const content = readFileSync(filePath);
		// return createHash('md5').update(content).digest('hex');
	},

	shouldProcess(relPath, currentSig) {
		if (OPTIONS.force) return true;
		const cachedSig = this.data[relPath];
		return cachedSig !== currentSig;
	},

	update(relPath, sig) {
		this.data[relPath] = sig;
	}
};

// ==========================================
// 4. FILE SYSTEM OPS
// ==========================================
function findFiles(dir, ext) {
	let results = [];
	try {
		const list = readdirSync(dir);
		for (const file of list) {
			const filePath = join(dir, file);
			const stat = statSync(filePath);
			if (stat && stat.isDirectory()) {
				results = results.concat(findFiles(filePath, ext));
			} else if (filePath.endsWith(ext)) {
				results.push(filePath);
			}
		}
	} catch (e) {
		console.error(fmt('red', `[ERR] Access denied or path invalid: ${dir}. ${e.message}`));
		process.exit(1);
	}
	return results;
}

function generatePoster(inputPath, outputPath) {
	const result = spawnSync(CONFIG.ffmpegCmd, CONFIG.ffmpegArgs(inputPath, outputPath));
	return {
		success: result.status === 0,
		error: result.stderr ? result.stderr.toString() : null
	};
}

// ==========================================
// 5. MAIN ORCHESTRATION
// ==========================================
function run() {
	const searchRoot = OPTIONS.target ? join(CONFIG.baseDir, OPTIONS.target) : CONFIG.baseDir;

	if (!existsSync(searchRoot)) {
		console.error(fmt('red', `[ERR] Target directory not found: ${searchRoot}`));
		process.exit(1);
	}

	Cache.load();
	Logger.header(searchRoot, OPTIONS.ext, OPTIONS.force, OPTIONS.dryRun);

	const videos = findFiles(searchRoot, OPTIONS.ext);
	const stats = { processed: 0, skipped: 0, errors: 0 };

	if (videos.length === 0) {
		console.log(fmt('yellow', '   No videos found matching criteria.'));
		return;
	}

	for (const videoPath of videos) {
		const outputName = basename(videoPath, OPTIONS.ext) + '-poster.webp';
		const outputPath = join(dirname(videoPath), outputName);
		const relPath = relative(CONFIG.baseDir, videoPath); // Key for cache

		// 1. Calculate current signature
		const currentSig = Cache.getSignature(videoPath);

		// 2. Determine if skip needed
		const outputExists = existsSync(outputPath);
		const isStale = Cache.shouldProcess(relPath, currentSig);

		// Logic: Skip if output exists AND cache matches
		if (outputExists && !isStale) {
			Logger.skip(relPath, 'Up to date');
			stats.skipped++;
			continue;
		}

		// 3. Process
		Logger.process(relPath, OPTIONS.dryRun);

		if (OPTIONS.dryRun) {
			Logger.success(true);
			stats.processed++;
			continue;
		}

		const { success, error } = generatePoster(videoPath, outputPath);

		if (success) {
			Logger.success(false);
			Cache.update(relPath, currentSig); // Update cache on success
			stats.processed++;
		} else {
			Logger.fail(error);
			stats.errors++;
		}
	}

	Cache.save();
	Logger.summary(stats);
}

// Execute
run();
