export interface Project {
	slug: string;
	layout: ProjectLayout;
	name: string;
	shortName?: string;
	types: ProjectType[];
	description: string;
	year: number;
	// optional fields
	collaborators?: ExternalLink[] | string[];
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
	fallbackSrc?: string; // for video fallback (h264 mp4)
	posterSrc?: string; // for video poster image
	alt: string;
	isCover?: boolean;
	isHero?: boolean;
	showAlt?: boolean;
	groupId?: string; // media with same groupId will be rendered side-by-side
	aspectRatio?: string; // e.g. "16/9", "4/3"
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

export type ProjectLayout = 'standard' | 'immersive-video' | 'immersive-img';
