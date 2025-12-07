import type { DesignProjectMedia, Project } from '$lib/types/project';

export type MediaItem = NonNullable<Project['medias']>[number];
export type MediaGroup = { type: 'group'; groupId: string; items: DesignProjectMedia[] };
export type GalleryItem = MediaItem | MediaGroup;

export function getMediaStyle(media: MediaItem): string {
	// Only apply styles to image/video, not text
	if (media.type === 'text' || media.type === 'code') return '';

	// Cast to visual media type (ImageMedia | VideoMedia) after excluding text types
	const visualMedia = media as Exclude<MediaItem, { type: 'text' | 'code' }>;
	const styles: string[] = [];

	// handle aspect ratio
	if (visualMedia.aspectRatio) {
		styles.push(`aspect-ratio: ${visualMedia.aspectRatio}`);
	}

	// handle object-position for image/video alignment within container
	// this controls which part of the media is visible when cropped by object-fit: cover
	const justify = visualMedia.justify || 'center';
	const align = visualMedia.align || 'center';

	// Map align values: 'top' -> 'top', 'center' -> 'center', 'bottom' -> 'bottom'
	// Map justify values: 'left' -> 'left', 'center' -> 'center', 'right' -> 'right'
	styles.push(`object-position: ${justify} ${align}`);

	return styles.join('; ');
}

/**
 * Flatten gallery items to individual media items (expanding groups)
 */
export function flattenGalleryItems(galleryItems: GalleryItem[]): MediaItem[] {
	return galleryItems.flatMap((item) => (item.type === 'group' ? item.items : [item]));
}

/**
 * Get visual media index (excluding text/code items from numbering)
 * Works with flattened media items array
 */
export function getVisualMediaIndex(media: MediaItem, flatMediaItems: MediaItem[]): number {
	if (media.type === 'text' || media.type === 'code') return -1;
	const visualMedias = flatMediaItems.filter(
		(m): m is Exclude<MediaItem, { type: 'text' | 'code' }> =>
			m.type !== 'text' && m.type !== 'code'
	);
	return visualMedias.indexOf(media as Exclude<MediaItem, { type: 'text' | 'code' }>);
}

/**
 * Group media items by their groupId, preserving order of first appearance.
 * Items without groupId remain as individual items.
 */
export function groupMediaItems(mediaItems: MediaItem[]): GalleryItem[] {
	const grouped = new Map<string, MediaItem[]>();

	// First pass: collect grouped items
	for (const media of mediaItems) {
		if (media.groupId) {
			if (!grouped.has(media.groupId)) {
				grouped.set(media.groupId, []);
			}
			grouped.get(media.groupId)!.push(media);
		}
	}

	// Second pass: build result array in order of first appearance
	const result: GalleryItem[] = [];
	const processedGroups = new Set<string>();

	for (const media of mediaItems) {
		if (media.groupId && !processedGroups.has(media.groupId)) {
			result.push({
				type: 'group',
				groupId: media.groupId,
				items: grouped.get(media.groupId)!
			});
			processedGroups.add(media.groupId);
		} else if (!media.groupId) {
			result.push(media);
		}
	}

	return result;
}
