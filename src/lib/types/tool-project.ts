export interface ToolProject {
	slug: string;
	type: 'cli' | 'desktop app' | 'web app' | 'class library' | 'script' | 'plugin' | (string & {});
	name: string;
	description: string;
	year: number;
	technologies: string[];
	repository?: ExternalLink;
	website?: ExternalLink;
	liveDemo?: ExternalLink;
	markdownContent?: string; // markdown content
	priority?: number; // for sorting purposes, higher number means higher priority
	license?: ExternalLink;
}

interface ExternalLink {
	text: string;
	url: string;
}
