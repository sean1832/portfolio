import type { Project } from '$lib/types/project';
import { makeContribution } from '$lib/data/factories';

export const data: Project = {
	priority: 60,
	layout: 'standard',
	slug: 'modular',
	name: 'modular: natural build',
	year: 2022,
	description: getDescription(),
	types: ['international competition'],
	location: 'Tanaff, Senegal',
	collaborators: ['chukang liang', 'wanyue peng'],
	awards: [
		{
			text: 'Honorable Mention | Modular Home / Edition #2 | Architecture Competitions',
			url: 'https://architecturecompetitions.com/modularhome2/'
		}
	],
	publications: [
		{
			text: 'Honourable Mention Interview | Architecture Competitions',
			url: 'https://architecturecompetitions.com/mod-2-hon-interview',
			type: 'article'
		},
		{
			text: 'How Can Modular Design Be Used to Revolutionize Housing Architecture? | ArchDaily',
			url: 'https://www.archdaily.com/1015545/how-can-modular-design-be-used-to-revolutionize-housing-architecture?ad_medium=gallery',
			type: 'article'
		}
	],
	contributions: [
		makeContribution('grasshopper & code development', 100),
		makeContribution('design & modeling', 75),
		makeContribution('rendering', 100),
		makeContribution('details / assembly development', 50),
		makeContribution('narrative & concept', 50),
		makeContribution('drawing & diagramming', 25)
	],
	medias: [
		{
			type: 'image',
			src: '/projects/modular/render.avif',
			alt: 'exterior render',
			isHero: true
		},
		{
			type: 'image',
			src: '/projects/modular/drone-view.avif',
			alt: 'drone view',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/modular/axo.avif',
			alt: 'module assembly details',
			isCover: true,
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/modular/plans.avif',
			alt: 'spatial planing',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/modular/sections.avif',
			alt: 'sections',
			showAlt: true
		}
	]
};

function getDescription() {
	return `The project proposed a low-tech, bamboo-based modular
housing system designed to address critical housing shortages
in Tanaff, a remote town in southern Senegal. Bamboo is selected
for its local availability and structural properties, enabling
self-construction without the need for heavy machinery, which
is vital given the limited infrastructure and isolation of the
area. The system's design emphasizes flexibility and scalability,
incorporating local materials and traditional techniques to
enhance community participation and adaptability to the local
context. Implemented in an area plagued by environmental
challenges, the project aims to validate its effectiveness under
harsh conditions and offer a sustainable, scalable model for
similar global settings.`.trim();
}
