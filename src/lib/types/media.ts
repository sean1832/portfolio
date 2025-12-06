export interface MediaBase {
	groupId?: string;
	isHiddenGallery?: boolean;
}

export interface ImageMedia extends MediaBase {
	type: 'image' | 'remote-image';
	src: string;
	alt: string;
	// positioning options
	justify?: string;
	align?: string;
	aspectRatio?: '16/9' | '1.85/1' | '4/3' | '1/1' | (string & {});
	// text display options
	showAlt?: boolean;
	description?: string;
	// special flags
	isCover?: boolean;
	isHero?: boolean;
}

export interface VideoMedia extends MediaBase {
	type: 'video';
	src: string;
	fallbackSrc?: string;
	posterSrc?: string;
	alt: string;
	// positioning options
	justify?: string;
	align?: string;
	aspectRatio?: '16/9' | '1.85/1' | '4/3' | '1/1' | (string & {});
	// text display options
	showAlt?: boolean;
	description?: string;
	// special flags
	isCover?: boolean;
	isHero?: boolean;
}

export interface TextMedia extends MediaBase {
	type: 'text';
	content: string;
	title?: string;
}

export interface CodeMedia extends MediaBase {
	type: 'code';
	content: string;
	lang: string;
	title?: string;
}
