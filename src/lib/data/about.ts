import type { AboutData } from '$lib/types/about-data';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '$lib/components/icons';
import { InstagramIcon } from '@lucide/svelte';

export const About: AboutData = {
	name: 'Zeke Zhang',
	description:
		`Researcher and computational designer working at the intersection of code and architecture. 
    I combine algorithmic design, reinforcement learning, and GPU-accelerated workflows to 
    develop data-driven, resource-efficient design systems. My work involves building 
    custom toolchains (Grasshopper/RhinoCommon, ILGPU, ML-Agents) and training AI models 
    (PyTorch, ONNX) that translate complex environmental and structural data into actionable 
    design logic.`.trim(),
	links: [
		{ label: 'github', url: 'https://github.com/sean1832', icon: GithubIcon },
		{
			label: 'linkedin',
			url: 'https://www.linkedin.com/in/zeke-zhang-3b9a2b191/',
			icon: LinkedinIcon
		},
		{ label: 'youtube', url: 'https://www.youtube.com/@seanzhang3873', icon: YoutubeIcon },
		{ label: 'instagram', url: 'https://www.instagram.com/seanzhang9266/', icon: InstagramIcon }
	]
};
