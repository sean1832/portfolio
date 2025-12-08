/**
 * Script to generate OG image PNG from SVG
 * Run with: node scripts/generate-og-image.js
 *
 * Prerequisites: npm install sharp
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOgImage() {
	try {
		// Dynamic import for sharp (optional dependency)
		const sharp = (await import('sharp')).default;

		const svgPath = join(__dirname, '../static/og-image.svg');
		const pngPath = join(__dirname, '../static/og-image.png');

		const svgBuffer = readFileSync(svgPath);

		await sharp(svgBuffer).resize(1200, 630).png().toFile(pngPath);

		console.log('✓ Generated og-image.png (1200x630)');

		// Also generate apple touch icon
		const appleSvgPath = join(__dirname, '../static/apple-touch-icon.svg');
		const applePngPath = join(__dirname, '../static/apple-touch-icon.png');

		const appleSvgBuffer = readFileSync(appleSvgPath);

		await sharp(appleSvgBuffer).resize(180, 180).png().toFile(applePngPath);

		console.log('✓ Generated apple-touch-icon.png (180x180)');
	} catch (error) {
		if (error.code === 'ERR_MODULE_NOT_FOUND') {
			console.log('⚠️  Sharp not installed. Install with: npm install sharp');
			console.log('   Then run: node scripts/generate-og-image.js');
			console.log('\n   Alternatively, convert SVG to PNG manually:');
			console.log('   - static/og-image.svg → static/og-image.png (1200x630)');
			console.log('   - static/apple-touch-icon.svg → static/apple-touch-icon.png (180x180)');
		} else {
			console.error('Error generating images:', error);
		}
	}
}

generateOgImage();
