import type { Component } from 'svelte';

export interface AboutData {
	name: string;
	description: string;
	media?: {
		src: string;
		alt: string;
	};
	links?: {
		label: string;
		url: string;
		icon?: Component;
	}[];
}
