import type { ToolProject } from '$lib/types/tool-project';

export const data: ToolProject = {
	slug: 'pinterest-dl',
	name: 'pinterest-dl',
	type: 'cli',
	description: 'An unofficial Pinterest media downloader',
	year: 2024,
	technologies: ['python', 'requests', 'selenium'],
	repositoryUrl: 'https://github.com/sean1832/pinterest-dl',
	websiteUrl: 'https://pypi.org/project/pinterest-dl',
	medias: [
		{
			type: 'remote-image',
			src: 'https://github.com/sean1832/pinterest-dl/raw/main/doc/images/pinterest-dl-scrape.gif',
			alt: 'pinterest-dl-scraping-demo'
		},
		{
			type: 'code',
			lang: 'bash',
			content: 'pip install pinterest-dl',
			title: 'installation'
		}
	]
};
