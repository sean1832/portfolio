import type { Project } from '$lib/types/project';
import { makeContribution } from '$lib/data/factories';

export const data: Project = {
	priority: 80,
	layout: 'standard',
	slug: 'synthetic-dunescapes',
	name: 'syntehtic dunescapes',
	year: 2024,
	description: getDescription(),
	types: ['design studio'],
	location: 'Desert Region, Middle East',
	directors: [{ text: 'Dr. Alisa Andrasek', url: 'https://www.alisaandrasek.com/' }],
	collaborators: ['luyao jiang', 'kang liu'],
	awards: [
		{
			text: 'Shortlisted Master of Architectural Design Awards for Excellence | 2024 Semester 1 | RMIT University',
			url: 'https://www.instagram.com/p/C8vhpFsyVCO/?img_index=3'
		}
	],
	contributions: [
		makeContribution('tectonic design search', 45),
		makeContribution('lora training', 50),
		makeContribution('narrative development', 100),
		makeContribution('grasshopper code development', 20),
		makeContribution('diagramming', 35)
	],
	medias: [
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/section-collage.webp',
			alt: 'syntehtic dunescapes 2024 - collage',
			isCover: true
		}
	]
};

function getDescription() {
	return `The project envisions a future where rapid population
growth, resource scarcity, and climate change force humans
to inhabit previously uninhabitable regions such
as deserts. To address this challenge, we propose an
adaptive, self-organizing system composed of autonomous,
self-assembled modular robotic units. These
units, functioning both individually and collectively, can
autonomously adapt and transform to create sustainable
living conditions by integrating design, technology,
and ecology. Drawing insights from thinkers like Jeremy
Rifkin and Benjamin Bratton, the project seeks to
merge design, technology, and ecology to transform
challenging landscapes into viable habitats for very
large buildings designed with 80% nonhuman and 20%
human programming.`.trim();
}
