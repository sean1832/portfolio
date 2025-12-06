import type { CodeMedia, ImageMedia, TextMedia, VideoMedia } from './media';

export interface ToolProject {
	slug: string;
	type: 'cli' | 'desktop app' | 'web app' | 'class library' | 'script' | 'plugin' | (string & {});
	name: string;
	description: string;
	year: number;
	technologies: string[];
	repositoryUrl?: string;
	websiteUrl?: string;
	liveDemoUrl?: string;
	medias?: (ImageMedia | VideoMedia | TextMedia | CodeMedia)[];
	priority?: number; // for sorting purposes, higher number means higher priority
}
