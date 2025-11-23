import type { PageLoad } from './$types';
import { designProjects } from '$lib/data/designs';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const project = designProjects.find((p) => p.slug === slug);
	if (!project) {
		throw new Error('Project not found');
	}
	return { project };
};
