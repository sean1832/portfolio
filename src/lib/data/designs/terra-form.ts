import type { Project } from '$lib/types/project';
import { makeContribution } from '$lib/data/factories';

export const data: Project = {
	priority: 0,
	layout: 'standard',
	slug: 'terra-form',
	name: 'terra // form',
	year: 2021,
	description: getDescription(),
	types: ['design studio'],
	location: 'North Dharavi, Mumbai, India',
	collaborators: ['Eu Yeo'],
	directors: [
		{
			text: 'Dr. Natalie Alima',
			url: 'https://www.linkedin.com/in/dr-natalie-alima-241b90127/'
		},
		{
			text: 'Dr. Dasong Wang',
			url: 'https://dasongwang.wordpress.com/'
		}
	],
	awards: [
		{
			text: 'Shortlisted Master of Architectural Design Awards for Excellence | 2021 Semester 2 | RMIT University',
			url: 'https://www.instagram.com/p/CWKc1kKNila/?img_index=4'
		}
	],
	contributions: [
		makeContribution('grasshopper code & simulation development', 100),
		makeContribution('video production & rendering', 100),
		makeContribution('design & modeling', 90),
		makeContribution('diagraming, (inc. siteplan & sections)', 75),
		makeContribution('narrative & concept', 80)
	],
	medias: [
		{
			type: 'video',
			src: '/projects/terra-form/hero-shorts-1080p_2mbps.av1.webm',
			fallbackSrc: '/projects/terra-form/hero-shorts-1080p_5mbps.h264.mp4',
			posterSrc: '/projects/terra-form/hero-shorts-1080p_5mbps.h264-poster.webp',
			alt: 'hero render shorts',
			isHero: true
		},
		{
			type: 'image',
			src: '/projects/terra-form/hero.webp',
			alt: 'terra form - 2021',
			isCover: true
		},

		{
			type: 'image',
			src: '/projects/terra-form/mycelium-photo.avif',
			alt: 'mycelium growth in petri dish',
			showAlt: true,
			groupId: 'mycelium-study',
			aspectRatio: '1/1'
		},
		{
			type: 'image',
			src: '/projects/terra-form/mycelium-scan.avif',
			alt: 'digital scan of mycelium growth patterns',
			showAlt: true,
			groupId: 'mycelium-study',
			aspectRatio: '1/1'
		},
		{
			type: 'video',
			src: '/projects/terra-form/pipe-system-formation_1074p_256kbps.av1.webm',
			fallbackSrc: '/projects/terra-form/pipe-system-formation_1074p_512kbps.h264.mp4',
			posterSrc: '/projects/terra-form/pipe-system-formation_1074p_512kbps.h264-poster.webp',
			alt: 'water pipe system formation animation',
			showAlt: true,
			groupId: 'pipe-system',
			aspectRatio: '4/3'
		},
		{
			type: 'image',
			src: '/projects/terra-form/pipe-system.avif',
			alt: 'water pipe system diagram',
			showAlt: true,
			groupId: 'pipe-system',
			aspectRatio: '4/3'
		},
		{
			type: 'image',
			src: '/projects/terra-form/texture-pallet-1.avif',
			alt: 'material texture pallet a',
			showAlt: true,
			aspectRatio: '5/3',
			groupId: 'texture-pallet'
		},
		{
			type: 'image',
			src: '/projects/terra-form/texture-pallet-2.avif',
			alt: 'material texture pallet b',
			showAlt: true,
			aspectRatio: '5/3',
			groupId: 'texture-pallet'
		},
		{
			type: 'video',
			src: '/projects/terra-form/process-form_1074p_1024kbps.av1.webm',
			fallbackSrc: '/projects/terra-form/process-form_1074p_4096kbps.h264.mp4',
			posterSrc: '/projects/terra-form/process-form_1074p_4096kbps.h264-poster.webp',
			alt: 'process of form generation animation',
			showAlt: true,
			aspectRatio: '4/3'
		},
		{
			type: 'image',
			src: '/projects/terra-form/drone-view.avif',
			alt: 'aerial overview of the site and structures',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/terra-form/detox-center-exterior.avif',
			alt: 'detox center - exterior view',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/terra-form/washing-hub-stairs.avif',
			alt: 'internal circulation',
			showAlt: true
		},
		{
			type: 'image',
			src: '/projects/terra-form/urban-farm.avif',
			alt: 'urban farm - exterior view',
			aspectRatio: '1/1',
			groupId: 'pallette'
		},
		{
			type: 'image',
			src: '/projects/terra-form/water-inlet.avif',
			alt: 'water inlet',
			aspectRatio: '1/1',
			groupId: 'pallette'
		}
	]
};

function getDescription() {
	return `The project emerges as a pioneering architectural
endeavor in the heart of Dharavi, Mumbai, addressing 
the critical issue of relocation and environmental degradation. 
Focused on preserving the socio-economic fabric of the community, 
this project introduces a sustainable water treatment facility to provide clean water, 
while also reimagining living spaces that integrate seamlessly with the natural environment. 
The design of the five structures is deeply informed by the growth patterns of mycelium, 
observed and cultivated in petri dishes. These organic patterns are digitally scanned and 
processed through sophisticated algorithms to shape the building forms, promoting a unique 
symbiosis between architectural innovation and biological inspiration. This approach not only 
supports the creation of microclimates conducive to local biodiversity but also transforms the 
buildings into living ecosystems that enhance urban air quality and foster a dynamic interaction 
between humans and nature.`.trim();
}
