import type { ToolProject } from '$lib/types/tool-project';
import mdContent from './pinterest-dl.md?raw';

export const data: ToolProject = {
	slug: 'pinterest-dl',
	name: 'pinterest-dl',
	type: 'cli',
	description: 'An unofficial Pinterest media downloader',
	year: 2024,
	technologies: ['python', 'requests', 'selenium'],
	repository: { text: 'Github', url: 'https://github.com/sean1832/pinterest-dl' },
	website: { text: 'PYPI', url: 'https://pypi.org/project/pinterest-dl' },
	markdownContent: mdContent,
	license: { text: 'apache-2.0', url: 'https://github.com/sean1832/pinterest-dl/blob/main/LICENSE' }
};
