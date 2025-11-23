// automatically import all .ts

import type { Project } from '$lib/types/project';

interface DesignModule {
	data: Project;
}

// use an array to include *.ts AND explicitly exclude index.ts
const modules = import.meta.glob<DesignModule>(['./*.ts', '!./index.ts'], {
	eager: true
});

export const designProjects: Project[] = Object.values(modules)
	.map((module) => module.data)
	.sort((a, b) => {
		// Coalesce undefined priority to 0
		const priorityA = a.priority ?? 0;
		const priorityB = b.priority ?? 0;

		// Primary Sort: Priority (Descending)
		if (priorityA !== priorityB) {
			return priorityB - priorityA;
		}

		// Secondary Sort: Year (Descending)
		return b.year - a.year;
	});

// Featured design projects with video media
export const featureProjectWithVideo = designProjects.find(
	(p) => p.isFeature && p.medias?.some((m) => m.type === 'video')
);
