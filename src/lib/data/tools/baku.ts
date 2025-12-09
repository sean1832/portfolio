import type { ToolProject } from '$lib/types/tool-project';
import mdContent from './baku.md?raw';

export const data: ToolProject = {
	slug: 'baku',
	name: 'baku',
	type: 'plugin',
	description: `
    an experimental, high-performance Grasshopper plugin for 
    GPU-accelerated simulation of large-scale particle 
    systems and boid flocking.
    `.trim(),
	year: 2023,
	technologies: ['csharp', 'ILGPU', 'cuda', 'opencl', 'grasshopper', 'rhinocommon', 'rhino3d'],
	repository: { text: 'Github', url: 'https://github.com/sean1832/baku' },
	license: { text: 'Apache-2.0', url: 'https://github.com/sean1832/BAKU/blob/master/LICENSE' },
	markdownContent: mdContent
};
