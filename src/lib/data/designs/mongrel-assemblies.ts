import type { Project } from '$lib/types/project';

export const data: Project = {
	priority: 70,
	layout: 'standard',
	slug: 'mongrel-assemblies',
	name: 'mongrel assemblies',
	year: 2023,
	description: getDescription(),
	types: ['research'],
	location: 'Queen Victoria Market, Melbourne, Australia',
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
			alt: 'mongrel assembly - 2023',
			showAlt: true,
			isCover: true,
			groupId: 'component-compositions',
			aspectRatio: '5/4'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/component-composition-02.avif',
			alt: 'mongrel assembly - 2023',
			showAlt: true,
			groupId: 'component-compositions',
			aspectRatio: '5/4'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/composition-catalogue.avif',
			alt: 'reinforcement learning training results gallery'
		},
		{
			type: 'image',
			src: '/projects/mongrel-assembly/diagram.avif',
			alt: 'reinforcement learning training logic flowchart'
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
