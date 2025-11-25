// import all image as high-res webp urls
const fullImages = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true, // will bundle the images as part of the build

	// 'as=srcset': Returns a string like "img-400.webp 400w, img-800.webp 800w..."
	query: {
		as: 'srcset',
		format: 'avif',
		w: '640;1280;1366;1920;2560' // Generate widths
	}
});

// import all image as base64 strings
const placeholders = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true, // will bundle the images as part of the build
	query: { as: 'base64', format: 'png', w: '16' }
});

export interface ImageAsset {
	srcset: string;
	placeholder: string;
	fallbackSrc: string; // a standard url for `src` attribute as backup
}

export function getImage(filename: string): ImageAsset | null {
	// match the keys
	const key = `/src/lib/assets${filename}`;
	const fullModule = fullImages[key] as { default: string } | string;
	const placeholderModule = placeholders[key] as { default: string } | string;

	if (!fullModule || !placeholderModule) {
		return null;
	}

	const srcset = typeof fullModule === 'object' ? fullModule.default : fullModule;
	const placeholder =
		typeof placeholderModule === 'object' ? placeholderModule.default : placeholderModule;

	// extract largest image from srcset and use as fallback src
	const lastEntry = srcset.split(',').pop()?.trim() || '';
	const fallbackSrc = lastEntry.split(' ')[0] || '';

	return { srcset, placeholder, fallbackSrc };
}
