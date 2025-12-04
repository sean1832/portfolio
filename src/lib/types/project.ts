export interface Project {
	slug: string;
	layout: 'standard' | 'immersive-video' | 'immersive-img';
	name: string;
	shortName?: string;
	types: ProjectType[];
	description: string;
	year: number;
	// optional fields
	collaborators?: ExternalLink[] | string[];
	supporters?: ExternalLink[] | string[];
	directors?: ExternalLink[] | string[];
	contributions?: Contribution[];
	tools?: Tool[];
	location?: string;
	publications?: Publication[];
	awards?: ExternalLink[];
	medias?: Media[];
	priority?: number; // for sorting purposes, higher number means higher priority
	isFeature?: boolean; // to highlight special projects
}

export interface Media {
	type: 'video' | 'image';
	src: string;
	fallbackSrc?: string;
	posterSrc?: string;
	alt: string;
	isCover?: boolean;
	isHiddenGallery?: boolean; // media that is not shown in the gallery but can be used in other ways (e.g. as posterSrc)
	isHero?: boolean;
	showAlt?: boolean;
	groupId?: string; // media with same groupId will be rendered side-by-side
	aspectRatio?: string; // e.g. "16/9", "4/3"
	description?: string; // longer description for media
	justify?: 'left' | 'center' | 'right' | (string & {}); // horizontal position of visible area when cropped (object-position x)
	align?: 'top' | 'center' | 'bottom' | (string & {}); // vertical position of visible area when cropped (object-position y)
}

export interface ExternalLink {
	text: string;
	url?: string;
}

export interface Publication extends ExternalLink {
	type: 'article' | 'exhibition';
}

export interface Contribution {
	description: string;
	percent: number;
}

export type ProjectType =
	| 'exhibition'
	| 'major project'
	| 'design studio'
	| 'research'
	| 'research assistance'
	| 'installation'
	| 'international competition';

export type Tool =
	| 'grasshopper'
	| 'grasshopper/karamba'
	| 'rhino3d'
	| 'processing'
	| 'unity'
	| 'unity/ml-agents'
	| 'unreal engine'
	| 'enscape'
	| 'python'
	| 'c#'
	| 'mid-journey'
	| 'stable diffusion'
	| 'flux';
