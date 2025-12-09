import type { ToolProject } from '$lib/types/tool-project';
import mdContent from './sumgpt.md?raw';

export const data: ToolProject = {
	slug: 'sumgpt',
	name: 'SumGPT',
	type: 'web app',
	description: 'Bulk summarization of documents using ChatGPT API',
	year: 2022,
	technologies: ['python', 'streamlit', 'langchain', 'openai'],
	repository: { text: 'github', url: 'https://github.com/sean1832/sumgpt' },
	liveDemo: { text: 'sumgpt', url: 'https://sumgpt.streamlit.app/' },
	license: { text: 'MIT', url: 'https://github.com/sean1832/SumGPT/blob/master/LICENSE' },
	markdownContent: mdContent
};
