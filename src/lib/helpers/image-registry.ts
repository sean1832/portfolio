// ============================================================================
// IMAGE REGISTRY: Original images + tiny placeholders (no srcset re-encoding)
// ============================================================================
// Source images are pre-optimized, so we skip vite-imagetools scaling/re-encoding
// which produces larger files at lower quality. Only generate tiny placeholders.

// Original images (no transformation, just URL resolution)
const originalImages = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true,
	import: 'default'
});

// Low-quality placeholders (tiny base64 for blur-up progressive loading)
const placeholders = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true,
	query: { as: 'base64', format: 'png', w: '16' }
});

type ViteModule<T> = { default: T } | T;

export interface ImageAsset {
	src: string; // Original image URL (pre-optimized)
	placeholder: string; // Tiny base64 for blur-up effect
}

export function getImage(filename: string): ImageAsset | null {
	const key = `/src/lib/assets${filename}`;

	const originalMod = originalImages[key] as string | undefined;
	const placeholderMod = placeholders[key] as ViteModule<string> | undefined;

	if (!originalMod) {
		console.warn(`[ImageRegistry] Image not found: ${filename}`);
		return null;
	}

	// Placeholder may not exist in dev mode (vite-imagetools query not processed)
	// Fall back to original image if placeholder unavailable
	const placeholder = placeholderMod
		? typeof placeholderMod === 'object'
			? placeholderMod.default
			: placeholderMod
		: originalMod;

	return {
		src: originalMod,
		placeholder
	};
}
