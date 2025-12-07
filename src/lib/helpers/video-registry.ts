import { getImage, type ImageAsset } from './image-registry';

/**
 * Lazy-loaded video modules (URLs resolved at runtime, not bundled)
 * Uses eager: false to avoid increasing initial bundle size
 */
const videos = import.meta.glob('/src/lib/assets/**/*.{mp4,webm,ogg,ogv}', {
	eager: false, // Lazy load for performance (videos are large)
	import: 'default'
});

export interface VideoAsset {
	/** Primary video source (typically AV1 WebM) - lazy loaded */
	src: () => Promise<string>;
	/** Fallback video source (typically H.264 MP4) - lazy loaded */
	fallbackSrc?: () => Promise<string>;
	/** Poster image data (src, placeholder) - from image registry */
	poster: ImageAsset | null;
}

/**
 * Retrieves video asset metadata for a given filename path.
 *
 * @param primaryFilename - Path to primary video (e.g., "/projects/my-video.av1.webm")
 * @param fallbackFilename - Path to fallback video (required for browser compatibility)
 * @param posterFilename - Optional poster image path (e.g., "/projects/my-video-poster.webp")
 *
 * @returns VideoAsset with lazy-loaded sources and poster, or null if videos not found
 *
 * @example
 * ```ts
 * const video = getVideo(
 *   '/projects/boundary-expansion.av1.webm',
 *   '/projects/boundary-expansion.h264.mp4',
 *   '/projects/boundary-expansion-poster.webp'
 * );
 *
 * if (video) {
 *   const primaryUrl = await video.src();
 *   const fallbackUrl = await video.fallbackSrc();
 *   const posterData = video.poster; // { src, placeholder }
 * }
 * ```
 */
export function getVideo(
	primaryFilename: string,
	fallbackFilename?: string,
	posterFilename?: string
): VideoAsset | null {
	// Construct full keys for glob lookup
	const primaryKey = `/src/lib/assets${primaryFilename}`;
	const fallbackKey = `/src/lib/assets${fallbackFilename}`;

	// Retrieve lazy loader functions (not the actual URLs yet)
	const primaryModule = videos[primaryKey] as (() => Promise<string>) | undefined;
	const fallbackModule = videos[fallbackKey] as (() => Promise<string>) | undefined;

	// primaryModule is required; fallbackModule is recommended
	if (!primaryModule) {
		console.warn(
			`[video-registry] Missing video file(s):\n` +
				`  Primary: ${primaryFilename} ${primaryModule ? '✓' : '✗'}\n`
		);
		return null;
	}

	// Retrieve poster via existing image registry (handles optimization)
	const poster = posterFilename ? getImage(posterFilename) : null;

	return {
		// With 'import: default', the loader directly returns the URL string
		src: primaryModule,
		fallbackSrc: fallbackModule,
		poster
	};
}
