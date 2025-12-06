import type { ToolProject } from '$lib/types/tool-project';

export const data: ToolProject = {
	slug: 'sumgpt',
	name: 'SumGPT',
	type: 'web app',
	description: 'Bulk summarization of documents using ChatGPT API',
	year: 2022,
	technologies: ['python', 'streamlit', 'langchain'],
	repositoryUrl: 'https://github.com/sean1832/sumgpt',
	liveDemoUrl: 'https://sumgpt.streamlit.app/'
};
