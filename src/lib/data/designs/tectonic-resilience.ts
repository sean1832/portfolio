import type { Project } from '$lib/types/project';

export const data: Project = {
	priority: 90,
	layout: 'standard',
	slug: 'tectonic-resilience',
	name: 'tectonic resilience',
	year: 2024,
	description: getDescription(),
	types: ['major project'],
	location: 'Yutie Village, Chongqing, China',
	directors: [{ text: 'Dr. Alisa Andrasek', url: 'https://www.alisaandrasek.com/' }],
	medias: [
		{
			type: 'image',
			src: '/projects/tectonic-resilience/render-hotpot.avif',
			alt: 'perspective view of yutie village showing modular timber structures integrated into existing buildings',
			isHero: true,
			align: '65%'
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/siteplan.avif',
			alt: 'site adaptation logic',
			showAlt: true,
			description: `
			This project leverages a multi-agent pathfinding algorithm 
			to trace optimal pedestrian routes across Yutie's terrain, 
			informing the macro-level layout. Movement patterns shape 
			circulation paths that adapt naturally to topography, 
			anchoring the design within the landscape. This adaptive 
			logic aim to establishes a seamless, context-driven framework, 
			uniting built forms with intuitive site integration.
			`.trim()
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/render-timber-cluster.avif',
			alt: 'cluster of modular timber structures forming new community spaces',
			groupId: 'modular-adaptation'
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/render-hotpot.avif',
			alt: 'interior perspective of modular timber structure used as community gathering space',
			groupId: 'modular-adaptation'
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/macro-resolution.avif',
			alt: '[MACRO] - urban resolution',
			showAlt: true,
			groupId: 'resolutions',
			description: `
			The system reintegrates Yutie Village into Chongqing's 
			urban network through new structural pathways. These 
			interventions bridge physical divides, establishing 
			terrain-responsive connectivity that firmly embeds 
			the site within the broader city fabric.
			`.trim()
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/meso-resolution.avif',
			alt: '[MESO] - human resolution',
			showAlt: true,
			groupId: 'resolutions',
			description: `
			Modular plugins interface with existing buildings to generate 
			flexible community nodes. These human-scaled spaces prioritize 
			spatial adaptability, fostering social interaction and enhancing 
			the collective experience of the village through shared infrastructure.
			`.trim()
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/micro-resolution.avif',
			alt: '[MICRO] - material resolution',
			showAlt: true,
			groupId: 'resolutions',
			description: `
			Interlocking recycled timber modules aggregate to form responsive 
			façades and interiors. This material logic optimizes lighting and 
			ventilation, merging traditional textures with functional upgrades 
			to modernize the built environment efficiently.
			`.trim()
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/before-after.avif',
			alt: 'before / after',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/tectonic-resilience/collage.avif',
			alt: 'sectional collage of yutie village',
			showAlt: true,
			isCover: true
		}
	]
};

function getDescription() {
	return `Tectonic Resilience presents a scalable approach to
resilient urban redevelopment, using Yutie Village in
Chongqing as a model. Isolated on a steep hillside near
the city's core, Yutie Village faces social and physical
detachment, leading to the abandonment of much of
its buildings. Government's development plans risk
erasing the village's unique cultural heritage. This project
addresses these challenges through a multi-resolution
framework that integrates urban, human, and
material dimensions into a cohesive, adaptable system.
Inspired by organic systems, the design operates
across scales, with each scale addressing specific issues
to create a unified whole. Modular components of
sustainable materials like cross-laminated and recycled
timber enable gradual, eco-conscious transformation
that respects the village's historic character. This incremental
approach revitalizes Yutie Village, preserving its
identity while enhancing functionality.
The proposed framework establishes a resilient system
that adapts to diverse topographies and cultural contexts,
offering a scalable model for sustainable urban
development. Through this project, Tectonic Resilience
provides a solution that not only aims to rejuvenate
Yutie Village but also serves as a universally applicable,
adaptable urban model.`.trim();
}
