import type { Project } from '$lib/types/project';

export const data: Project = {
	priority: 90,
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
			src: '/projects/tectonic-resilience/collage.webp',
			alt: 'tectonic resilience 2024 - collage',
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
