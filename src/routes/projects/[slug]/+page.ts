import type { PageLoad } from './$types';
import { designProjects } from '$lib/data/designs';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const project = designProjects.find((p) => p.slug === slug);
	if (!project) {
		error(404, 'Project not found');
	}
	return { project };
};
