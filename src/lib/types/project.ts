import type { ImageMedia, VideoMedia, TextMedia, CodeMedia } from './media';

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
	medias?: DesignProjectMedia[];
	priority?: number; // for sorting purposes, higher number means higher priority
	isFeature?: boolean; // to highlight special projects
}

export type DesignProjectMedia = ImageMedia | VideoMedia | TextMedia | CodeMedia;

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
