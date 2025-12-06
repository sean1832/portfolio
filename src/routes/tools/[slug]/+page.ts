import type { PageLoad } from './$types';
import { toolProjects } from '$lib/data/tools';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return toolProjects.map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const project = toolProjects.find((p) => p.slug === slug);
	if (!project) {
		error(404, 'Tool not found');
	}
	return { project };
};
