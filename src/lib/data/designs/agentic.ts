import type { Project } from '$lib/types/project';
import { makeContribution } from '$lib/data/factories';

export const data: Project = {
	priority: 100,
	layout: 'immersive-video',
	isFeature: true,
	slug: 'agentic-architecture',
	name: 'agentic architecture: synthesising complexity for regenerative futures',
	shortName: 'agentic architecture',
	year: 2025,
	description: getDescription(),
	types: ['installation', 'exhibition'],
	location: 'miami, florida, USA',
	directors: [{ text: 'Dr. Alisa Andrasek', url: 'https://www.alisaandrasek.com/' }],
	collaborators: ['luyao jiang', 'ziyan li', 'jasmin whytlaw', 'kevin williams'],
	publications: [
		{
			text: 'Venice Biannale 2025: Intelligens, Natural, Artificial, Collective.',
			type: 'exhibition'
		}
	],
	contributions: [
		makeContribution('agent simulations', 100),
		makeContribution('voxel massing formulation', 100),
		makeContribution('volumetric segmentation by environmental analysis', 100),
		makeContribution('component aggregation', 50),
		makeContribution('distribution mapping', 50),
		makeContribution('diagramming (animation)', 50)
	],
	medias: [
		{
			type: 'video',
			src: '/projects/venice-bienale-2025/agents-perspective_1080p_2048kbps.h264.mp4',
			posterSrc: '/projects/venice-bienale-2025/agents-perspective_1080p_2048kbps.h264-poster.webp',
			alt: 'agentic architecture cover video 10sec',
			isCover: true
		}
	]
};

function getDescription() {
	return `Agentic Architecture explores how AI and data-driven strategies
can support the built environment in addressing systemic
global challenges. Developed under the direction of Prof. Alisa
Andrasek, the project was presented as a multi-channel video
installation framing information as a connective hinge in ecological
systems, positioning architecture as a responsive agent
in the face of climate change and urban densification. Building
on Andrasek's prior research in modular timber prefabrication,
including the AI Timber Tower, the project advances AI-powered
combinatorics in dry-joint timber construction to enable
accessible, high-performance, and cost-effective design. This
synthesis of ecological intelligence, advanced computation, and
design innovation contributes to a new paradigm for architecture
in complex urban ecosystems.`.trim();
}
