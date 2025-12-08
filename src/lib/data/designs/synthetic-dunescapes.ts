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
			src: '/projects/synthetic-dunescapes/render-exterior03.avif',
			alt: 'threashold between desert and building',
			isHero: true
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-exterior01.avif',
			alt: 'threashold between desert and building',
			aspectRatio: '1.85/1',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-exterior02.avif',
			alt: 'piezoelectric energy harvesting facade',
			aspectRatio: '1.85/1',
			align: 'top',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/synthetic-dunescapes/component-expansion_896p_1024kbps.AV1.webm',
			fallbackSrc: '/projects/synthetic-dunescapes/component-expansion_896p_2048kbps.H.264.mp4',
			posterSrc:
				'/projects/synthetic-dunescapes/component-expansion_896p_2048kbps.H.264-poster.webp',
			alt: 'incremental expansion of structural components',
			aspectRatio: '1.85/1',
			align: 'top',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/component-details.avif',
			alt: 'component details',
			groupId: 'component-details'
		},
		{
			type: 'video',
			src: '/projects/synthetic-dunescapes/component-aggregation_1080p_64kbps.AV1.webm',
			fallbackSrc: '/projects/synthetic-dunescapes/component-aggregation_1080p_4096kbps.H.264.mp4',
			posterSrc:
				'/projects/synthetic-dunescapes/component-aggregation_1080p_4096kbps.H.264-poster.webp',
			alt: 'modular robotic units aggregating',
			groupId: 'component-details',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/synthetic-dunescapes/spatial-transformation_720p_512kbps.AV1.webm',
			fallbackSrc: '/projects/synthetic-dunescapes/spatial-transformation_720p_1669kbps.H.264.mp4',
			posterSrc:
				'/projects/synthetic-dunescapes/spatial-transformation_720p_1669kbps.H.264-poster.webp',
			alt: 'modulation of light with self-assembling robotic units',
			aspectRatio: '1.9/1',
			align: 'top',
			showAlt: true,
			description: `
			The individual robotic units, inspired by the 3D self-reconfiguration and locomotion 
			modular robot developed at EPFL, are designed to be autonomous, self-assembling, 
			and self-organizing. Each unit is equipped with sensors, actuators, and communication 
			devices that enable it to interact with its environment and other units. 
			The units can aggregate to form larger structures, disassemble to adapt to 
			changing conditions, and reconfigure to optimize their performance. This adaptive 
			system allows for the rapid construction of complex architectural forms in 
			challenging environments.
			`.trim()
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-library.avif',
			alt: 'library',
			aspectRatio: '1/1',
			groupId: 'interior-renders-01'
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-ritualhub.avif',
			alt: 'ritual hub',
			aspectRatio: '1/1',
			groupId: 'interior-renders-01'
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-living.avif',
			alt: 'living quarters',
			aspectRatio: '1/1',
			groupId: 'interior-renders-02'
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/render-foodfactory.avif',
			alt: 'food factory',
			aspectRatio: '1/1',
			groupId: 'interior-renders-02'
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/diagram-workflow.avif',
			alt: 'AI workflow diagram',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/synthetic-dunescapes/section.avif',
			alt: 'sectional diagram of synthetic dunescape',
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
