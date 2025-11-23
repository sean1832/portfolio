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
			type: 'image',
			src: '/projects/terra-form/hero.webp',
			alt: 'terra form - 2021',
			isCover: true
		}
	]
};

function getDescription() {
	return `The project emerges as a pioneering architectural
endeavor in the heart of Dharavi, Mumbai, addressing 
the critical issue of relocation and environmental degradation. 
Focused on preserving the socio-economic fabric of the community, 
this initiative introduces a sustainable water treatment facility to provide clean water, 
while also reimagining living spaces that integrate seamlessly with the natural environment. 
The design of the five structures is deeply informed by the growth patterns of mycelium, 
observed and cultivated in petri dishes. These organic patterns are digitally scanned and 
processed through sophisticated algorithms to shape the building forms, promoting a unique 
symbiosis between architectural innovation and biological inspiration. This approach not only 
supports the creation of microclimates conducive to local biodiversity but also transforms the 
buildings into living ecosystems that enhance urban air quality and foster a dynamic interaction 
between humans and nature.`.trim();
}
