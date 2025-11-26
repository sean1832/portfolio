/**
 * Scans src/lib/assets/projects for video files and generates WebP posters.
 * * Usage:
 * node scripts/generate-posters.js --target on-country
 * node scripts/generate-posters.js --overwrite
 * node scripts/generate-posters.js --dry-run
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, basename, relative, dirname } from 'node:path';

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
	magenta: '\x1b[35m'
};

const fmt = (color, text) => `${STYLE[color]}${text}${STYLE.reset}`;

const Logger = {
	header: (scope, ext, overwrite, dry) => {
		console.log(`\n${fmt('bright', 'Poster Generator')}`);
		console.log(`   Scope:     ${fmt('cyan', scope)}`);
		console.log(`   Ext:       ${fmt('cyan', ext)}`);
		console.log(`   Overwrite: ${overwrite ? fmt('yellow', 'YES') : fmt('dim', 'NO')}`);
		console.log(
			`   Mode:      ${dry ? fmt('magenta', 'DRY RUN (Read-only)') : fmt('green', 'LIVE (Write enabled)')}\n`
		);
	},

	skip: (name) => console.log(`${fmt('dim', '   [SKIP]')} ${name}`),

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
	baseDir: './src/lib/assets/projects',
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
	overwrite: process.argv.includes('--overwrite'),
	dryRun: process.argv.includes('--dry-run')
};

// ==========================================
// 3. FILE SYSTEM OPS
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
// 4. MAIN ORCHESTRATION
// ==========================================
function run() {
	const searchRoot = OPTIONS.target ? join(CONFIG.baseDir, OPTIONS.target) : CONFIG.baseDir;

	if (!existsSync(searchRoot)) {
		console.error(fmt('red', `[ERR] Target directory not found: ${searchRoot}`));
		process.exit(1);
	}

	Logger.header(searchRoot, OPTIONS.ext, OPTIONS.overwrite, OPTIONS.dryRun);

	const videos = findFiles(searchRoot, OPTIONS.ext);
	const stats = { processed: 0, skipped: 0, errors: 0 };

	if (videos.length === 0) {
		console.log(fmt('yellow', '   No videos found matching criteria.'));
		return;
	}

	for (const videoPath of videos) {
		const outputName = basename(videoPath, OPTIONS.ext) + '-poster.webp';
		const outputPath = join(dirname(videoPath), outputName);
		const relPath = relative(CONFIG.baseDir, videoPath);

		// Skip Logic
		if (existsSync(outputPath) && !OPTIONS.overwrite) {
			Logger.skip(relPath);
			stats.skipped++;
			continue;
		}

		// Process Logic
		Logger.process(relPath, OPTIONS.dryRun);

		if (OPTIONS.dryRun) {
			Logger.success(true);
			stats.processed++;
			continue;
		}

		const { success, error } = generatePoster(videoPath, outputPath);

		if (success) {
			Logger.success(false);
			stats.processed++;
		} else {
			Logger.fail(error);
			stats.errors++;
		}
	}

	Logger.summary(stats);
}

// Execute
run();
