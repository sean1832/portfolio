import type { ToolProject } from '$lib/types/tool-project';
import mdContent from './portal.md?raw';

export const data: ToolProject = {
	slug: 'portal',
	name: 'Portal',
	type: 'class library',
	description: 'inter process communication framework for cross platform design development',
	year: 2024,
	technologies: ['csharp', 'python', 'grasshopper', 'rhinocommon', 'blender', 'rhino3d'],
	repository: { text: 'github', url: 'https://github.com/sean1832/portal' },
	website: { text: 'Food4Rhino', url: 'https://www.food4rhino.com/en/app/portal' },
	license: { text: 'apache-2.0', url: 'https://github.com/sean1832/Portal/blob/master/LICENSE' },
	markdownContent: mdContent
};
