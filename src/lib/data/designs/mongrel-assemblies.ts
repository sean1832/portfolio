import type { Project } from '$lib/types/project';

export const data: Project = {
	priority: 70,
	layout: 'standard',
	slug: 'mongrel-assemblies',
	name: 'mongrel assemblies',
	year: 2023,
	description: getDescription(),
	types: ['research assistance'],
	directors: [
		{
			text: 'Caitlyn Parry',
			url: 'https://www.rmit.edu.au/contact/staff-contacts/academic-staff/p/parry-ms-caitlyn'
		},
		{
			text: 'Halen Duong',
			url: 'https://architecture.rmit.edu.au/staff/helen-duong/'
		}
	],
	collaborators: ['Sam Torre', 'Alex Moorrees'],
	contributions: [
		{
			description: 'machine learning development',
			percent: 75
		},
		{
			description: 'database prototyping',
			percent: 50
		},
		{
			description: 'material offcut optimisation',
			percent: 100
		}
	],
	awards: [
		{
			text: 'Shortlisted Master of Architectural Design Awards for Excellence | 2023 Semester 2 | RMIT University',
			url: 'https://www.instagram.com/p/Czc5dDZSkJz/?img_index=4'
		}
	],
	publications: [
		{
			text: 'WILD HOPE Conversations for a Planetary Commons',
			url: 'https://www.theprojects.com.au/wild-hope-exhibition/',
			type: 'exhibition'
		}
	],
	medias: [
		{
			type: 'image',
			src: '/projects/mongrel-assembly/composition-catalogue.avif',
			alt: 'reinforcement learning training results gallery',
			isHero: true
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/component-composition-01.avif',
			alt: 'Assembly artifact generated through reinforcement learning',
			isCover: true,
			groupId: 'component-compositions',
			aspectRatio: '5/4'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/component-composition-02.avif',
			alt: 'Assembly artifact',
			showAlt: true,
			groupId: 'component-compositions',
			aspectRatio: '5/4'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/composition-catalogue.avif',
			alt: 'Reinforcement Learning-Optimized Component Compositions',
			showAlt: true
		},

		{
			type: 'video',
			src: '/projects/mongrel-assembly/ml-training_1080p_512kbps.av1.webm',
			fallbackSrc: '/projects/mongrel-assembly/ml-training_1080p_2048kbps.h264.mp4',
			posterSrc: '/projects/mongrel-assembly/ml-training_1080p_2048kbps.h264-poster.webp',
			alt: 'reinforcement learning with inter-process communication (unity & grasshopper)',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/unity-gh-infrastructure-sketch.avif',
			alt: 'Cross-Platform Unity-Grasshopper RL Interoperability Workflow',
			description: `
				Cross-platform infrastructure establishes closed-loop interoperability between 
				Unity and Grasshopper via UDP. Unity-hosted ML-Agents transmit action vectors 
				for geometry generation and discrete aggregation via WASP. Multi-physics simulations 
				(Karamba, Ladybug) subsequently derive weighted performance metrics, returning stress, 
				deformation, and shadow area data as state observations and reward signals to complete 
				the training cycle.
			`.trim(),
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/diagram.avif',
			alt: 'Discrete-Continuous Policy Execution and Weighted Reward Synthesis',
			description: `
				Episodic decision-making topology maps action spaces-continuous rotation 
				and discrete spawning to environmental observation vectors. State representation 
				logic incorporates spawn pool availability, neighbor distances, and 
				bounding box constraints. A multi-objective reward function aggregates 
				weighted parameters, including aggregation density and structural stress, 
				to drive policy optimization during training.
			`.trim(),
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/installation-01.avif',
			alt: 'RMIT Design Hub Exhibition Installation',
			groupId: 'installation-views',
			aspectRatio: '4/3'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/installation-02.avif',
			alt: 'Photographs by Tobias Titz (2023)',
			groupId: 'installation-views',
			aspectRatio: '4/3',
			showAlt: true
		}
	]
};

function getDescription() {
	return `This research proposed an innovative approach to sustainable 
architecture by developing a system for the intelligent assembly of recycled materials,
which inherently vary in geometry, size, and form. The project created a comprehensive 
material database to catalog the properties of salvaged materials, serving as the foundation 
for training reinforcement learning algorithms. These algorithms optimized the assembly process, 
aiming for structural integrity and aesthetic quality through discrete aggregation simulations.
By integrating machine learning with recycled material usage, this project not only addressed 
environmental sustainability by reducing construction waste but also enhanced architectural 
design processes, potentially leading to more innovative and cost-effective construction practices. 
The ultimate goal was to demonstrate that sustainable methods can be effectively aligned with 
architectural innovation, pushing the boundaries of technology in design.`.trim();
}
