// Check if we're in development mode
const isDev = import.meta.env.DEV;

// ============================================================================
// PRODUCTION MODE: Full image optimization via vite-imagetools
// ============================================================================

// Responsive srcset (AVIF - modern, efficient)
const fullImages = isDev
	? {}
	: import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
			eager: true,
			query: {
				as: 'srcset',
				format: 'avif',
				w: '1280;1920;2560'
			}
		});

// High-fidelity metadata (original dimensions + highest quality URL)
const highFidelityImages = isDev
	? {}
	: import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
			eager: true,
			query: {
				as: 'metadata',
				format: 'avif'
			}
		});

// Low-quality placeholders (prevents layout shift)
const placeholders = isDev
	? {}
	: import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
			eager: true,
			query: { as: 'base64', format: 'png', w: '16' }
		});

// ============================================================================
// DEVELOPMENT MODE: Fast, unoptimized images (no vite-imagetools processing)
// ============================================================================

// Simple URL imports for dev mode (no transformation)
const devImages = isDev
	? import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
			eager: true,
			import: 'default'
		})
	: {};

type ViteModule<T> = { default: T } | T;
export interface ImageMetadata {
	src: string;
	width: number;
	height: number;
	format: string;
}

export interface ImageAsset {
	srcset: string; // Combined: Responsive set + High-Fi at end
	placeholder: string;
	fallbackSrc: string; // Smallest AVIF from srcset (1280px)
	originalSrc: string; // High-Fi AVIF URL (original dimensions)
	width: number; // Native width
	height: number; // Native height
}

export function getImage(filename: string): ImageAsset | null {
	const key = `/src/lib/assets${filename}`;

	// ========================================================================
	// DEVELOPMENT MODE: Return unoptimized original image
	// ========================================================================
	if (isDev) {
		const devMod = devImages[key] as string | undefined;

		if (!devMod) {
			console.warn(`[ImageRegistry] Image not found: ${filename}`);
			return null;
		}

		// In dev mode, use the original image as placeholder too
		// This preserves aspect ratio without needing vite-imagetools processing
		// The pixelated-reveal component will show the image immediately (no animation delay)
		return {
			srcset: devMod, // Single image, no responsive variants
			placeholder: devMod, // Use same image as placeholder to preserve aspect ratio
			fallbackSrc: devMod,
			originalSrc: devMod,
			width: 0, // Unknown in dev mode (not used for layout)
			height: 0
		};
	}

	// ========================================================================
	// PRODUCTION MODE: Full optimization via vite-imagetools
	// ========================================================================

	// Retrieve Modules
	const fullMod = fullImages[key] as ViteModule<string>;
	const highFiMod = highFidelityImages[key] as ViteModule<ImageMetadata>;
	const placeholderMod = placeholders[key] as ViteModule<string>;

	// Guard Clause
	if (!fullMod || !highFiMod || !placeholderMod) {
		console.warn(`[ImageRegistry] Missing asset generation for: ${filename}`);
		return null;
	}

	// Extract Data
	const responsiveSrcset = typeof fullMod === 'object' ? fullMod.default : fullMod;
	const placeholder = typeof placeholderMod === 'object' ? placeholderMod.default : placeholderMod;
	const highFiData =
		typeof highFiMod === 'object' && 'default' in highFiMod
			? highFiMod.default
			: (highFiMod as ImageMetadata);

	// Extract fallback from srcset (first/smallest image = 1280px AVIF)
	const fallbackSrc = responsiveSrcset.split(',')[0].trim().split(' ')[0];

	// Construct Combined Srcset (responsive sizes + original high-fi)
	const combinedSrcset = `${responsiveSrcset}, ${highFiData.src} ${highFiData.width}w`;

	return {
		srcset: combinedSrcset,
		placeholder,
		fallbackSrc,
		originalSrc: highFiData.src,
		width: highFiData.width,
		height: highFiData.height
	};
}
