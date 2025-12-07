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
	location: 'Miami, Florida, USA',
	directors: [{ text: 'Dr. Alisa Andrasek', url: 'https://www.alisaandrasek.com/' }],
	collaborators: ['luyao jiang', 'ziyan li', 'jasmin whytlaw', 'kevin williams', 'fleur watson'],
	supporters: [
		{
			text: 'RMIT RACE Supercomputing Hub',
			url: 'https://www.rmit.edu.au/partner/hubs/race'
		},
		{
			text: 'RMIT School of Architecture and Urban Design',
			url: 'https://www.rmit.edu.au/about/schools-colleges/architecture-and-urban-design'
		},
		{
			text: 'AIARCH'
		}
	],
	publications: [
		{
			text: 'Venice Biannale 2025: Intelligens, Natural, Artificial, Collective. | La Biennale di Venezia',
			url: 'https://www.labiennale.org/en/architecture/2025/artificial/agentic-architecture-synthesising-complexity-regenerative-futures',
			type: 'exhibition'
		},
		{
			text: 'doi:10.25439/rmt.29654399 | RMIT Research Repository',
			url: 'https://doi.org/10.25439/rmt.29654399',
			type: 'article'
		}
	],
	contributions: [
		makeContribution('agent simulations', 100),
		makeContribution('voxel massing formulation', 100),
		makeContribution('intelligent spatial segmentation', 100),
		makeContribution('component aggregation', 50),
		makeContribution('distribution mapping', 50),
		makeContribution('diagramming (animation)', 50)
	],
	medias: [
		{
			type: 'video',
			src: '/projects/agentic/horizontal-preview_1440p_8192kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/horizontal-preview_1440p_8192kbps.H.264.mp4',
			posterSrc: '/projects/agentic/horizontal-preview_1440p_8192kbps.H.264-poster.webp',
			alt: 'agentic architecture horizontal preview video 12sec',
			isHero: true
		},
		{
			type: 'video',
			src: '/projects/agentic/agents-perspective_1080p_2048kbps.h264.mp4',
			posterSrc: '/projects/agentic/agents-perspective_1080p_2048kbps.h264-poster.webp',
			alt: 'agentic architecture cover video 10sec',
			aspectRatio: '3/4',
			isCover: true,
			isHiddenGallery: true
		},
		{
			type: 'image',
			src: '/projects/agentic/collage.avif',
			alt: 'quantum map (collage by Luyao Jiang)',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/agentic/agents-frame-01.avif',
			alt: 'agents perspective frame 01',
			aspectRatio: '1/1',
			groupId: 'agents-perspective-frames'
		},
		{
			type: 'image',
			src: '/projects/agentic/agents-frame-02.avif',
			alt: 'agents perspective frame 02',
			aspectRatio: '1/1',
			groupId: 'agents-perspective-frames'
		},
		{
			type: 'image',
			src: '/projects/agentic/agents-frame-03.avif',
			alt: 'agentic field',
			showAlt: true,
			aspectRatio: '1/1',
			groupId: 'agents-perspective-frames'
		},
		{
			type: 'image',
			src: '/projects/agentic/crystalization-perspective.avif',
			alt: 'crystallization',
			showAlt: true
		},
		{
			type: 'text',
			title: 'AGENTIC FIELD',
			content: `
			Agent-based simulations integrate magnetic-field analogies with classic flocking
			behaviors (cohesion, separation, and alignment) to generate directional flows
			and vortex-like dynamics reminiscent of storm systems. Each agent is driven by
			contextual site data, enabling autonomous decision-making while maintaining
			emergent collective coherence.`.trim()
		},
		{
			type: 'video',
			src: '/projects/agentic/1-voxel-view-vectors_1080p_256kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/1-voxel-view-vectors_1080p_1024kbps.H.264.mp4',
			posterSrc: '/projects/agentic/1-voxel-view-vectors_1080p_1024kbps.H.264-poster.webp',
			alt: 'voxel view vectors',
			aspectRatio: '1/1',
			groupId: 'voxel-to-component',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/agentic/2-voxel-to-components_1080p_90kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/2-voxel-to-components_1080p_256kbps.H.264.mp4',
			posterSrc: '/projects/agentic/2-voxel-to-components_1080p_256kbps.H.264-poster.webp',
			alt: 'voxel to components',
			aspectRatio: '1/1',
			groupId: 'voxel-to-component',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/agentic/3-component-view-vectors_1080p_512kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/3-component-view-vectors_1080p_1024kbps.H.264.mp4',
			posterSrc: '/projects/agentic/3-component-view-vectors_1080p_1024kbps.H.264-poster.webp',
			alt: 'component view',
			aspectRatio: '1/1',
			groupId: 'voxel-to-component',
			showAlt: true
		},

		{
			type: 'video',
			src: '/projects/agentic/view-vectors-cluster_1080p_256kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/view-vectors-cluster_1080p_512kbps.H.264.mp4',
			posterSrc: '/projects/agentic/view-vectors-cluster_1080p_512kbps.H.264-poster.webp',
			alt: 'view vectors cluster animation',
			aspectRatio: '4/3',
			groupId: 'cluster',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/agentic/face-evaluation_1080p_128kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/face-evaluation_1080p_512kbps.H.264.mp4',
			posterSrc: '/projects/agentic/face-evaluation_1080p_512kbps.H.264-poster.webp',
			alt: 'face evaluation animation',
			aspectRatio: '4/3',
			groupId: 'cluster',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/agentic/component-to-window_1080p_1024kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/component-to-window_1080p_4096kbps.H.264.mp4',
			posterSrc: '/projects/agentic/component-to-window_1080p_4096kbps.H.264-poster.webp',
			alt: 'component to window mapping animation',
			showAlt: true
		},
		{
			type: 'text',
			title: 'ALGORITHMIC ANALYSIS + SEGREGATION',
			content: `
				The agent-trail-generated voxel cloud is discretized and analyzed for view, 
				solar irradiance, and wind performance. Each voxel is then assigned a 
				simulation-derived numerical score, which governs volumetric zoning and the 
				allocation of components. Components are then aggregated into clusters. 
				Each component was designed with a focus on its connectivity and aggregation behaviors. 
				When assembled, these components generate the 'micro' tectonic texture.
				`.trim()
		},
		{
			type: 'video',
			src: '/projects/agentic/perspective-plan_1080p_1024kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/perspective-plan_1080p_3000kbps.H.264.mp4',
			posterSrc: '/projects/agentic/perspective-plan_1080p_3000kbps.H.264-poster.webp',
			alt: 'plan (animated by Ziyan Li)',
			showAlt: true,
			groupId: 'section-plan',
			aspectRatio: '4/3'
		},
		{
			type: 'video',
			src: '/projects/agentic/perspective-section_1080p_1024kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/perspective-section_1080p_3000kbps.H.264.mp4',
			posterSrc: '/projects/agentic/perspective-section_1080p_3000kbps.H.264-poster.webp',
			alt: 'section (animated by Ziyan Li)',
			showAlt: true,
			groupId: 'section-plan',
			aspectRatio: '4/3'
		},
		{
			type: 'text',
			title: 'HUMAN VS NON-HUMAN',
			content: `
				The tower's volume is stratified into human and non-human zones: 
				the perimeter façades, which receive maximum daylight and offer 
				optimal views, house habitable spaces, while the internal core, 
				where light and outlook are limited is reserved for non-human activities.
				`.trim()
		},
		{
			type: 'image',
			src: '/projects/agentic/workflow.avif',
			alt: 'ai workflow (lora trained by luyao jiang)',
			showAlt: true
		},
		{
			type: 'video',
			src: '/projects/agentic/lora-gallery_1080p_2048kbps.AV1.webm',
			fallbackSrc: '/projects/agentic/lora-gallery_1080p_4096kbps.H.264.mp4',
			posterSrc: '/projects/agentic/lora-gallery_1080p_4096kbps.H.264-poster.webp',
			alt: 'lora gallery (lora trained by luyao jiang)',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/agentic/installation-photo-01.avif',
			alt: 'venice biennale 2025 installation',
			showAlt: true
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
