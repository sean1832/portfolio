import type { Project } from '$lib/types/project';
import { makeContribution } from '$lib/data/factories';

export const data: Project = {
	priority: 60,
	slug: 'shara-clarke',
	name: 'shara clarke',
	year: 2021,
	description: getDescription(),
	types: ['design studio'],
	location: 'Framlingham, VIC, Australia',
	collaborators: ['chukang liang'],
	directors: [
		{
			text: 'Dr. Christine Phillips',
			url: 'https://architecture.rmit.edu.au/staff/christine-phillips/'
		},
		{
			text: 'Stasinos Mantzis',
			url: 'https://www.linkedin.com/in/stasinos-mantzis-64ab463b/'
		}
	],
	awards: [
		{
			text: 'ARM Architecture Prize',
			url: 'https://www.instagram.com/armarchitecture/p/CWVFOyvFK-9/?hl=zh-cn&ref=159'
		},
		{
			text: 'RASCOL Students Choice Award',
			url: 'https://www.instagram.com/p/CREE_m0lMBI/?img_index=1'
		}
	],
	publications: [
		{
			text: 'Architecture students embrace life-changing learning on Country',
			url: 'https://www.rmit.edu.au/news/all-news/2021/may/architectural-students-learning-on-country',
			type: 'article'
		},
		{
			text: 'On Country: Framlingham, Portfolio 2021',
			url: 'https://issuu.com/rmitarchitecture/docs/phillipsmantzis_zhang_zeke_sem1_2021',
			type: 'article'
		}
	],
	contributions: [
		makeContribution('grasshopper code & simulation development', 100),
		makeContribution('video production & rendering', 100),
		makeContribution('design & modeling', 50),
		makeContribution('diagraming, (inc. siteplan & sections)', 50),
		makeContribution('narrative & concept', 50)
	],
	medias: [
		{
			type: 'image',
			src: '/projects/on-country/section.webp',
			alt: 'shara clarke section - 2021',
			isCover: true
		}
	]
};

function getDescription() {
	return `Working with the Kirrae Wurrung community,
we designed a music center of international standards 
and educational facilities. The design emerges from the landscape, 
acknowledging and reflecting the indigenous cultures and history of the site. 
Inspired by indigenous arts and the experience of deep listening, the colourful mosaic pattern, 
present both inside and outside, invites the local community and artisans to participate in the design. 
Deep listening, a traditional memory code, is based on respect for nature and includes individual 
inner awareness of the site's features. The materiality and formality of the project introduce stories 
of the ancient volcanic activities that shaped today's topographical characteristics.`.trim();
}
