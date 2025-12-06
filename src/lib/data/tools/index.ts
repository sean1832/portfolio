// automatically import all .ts

import type { ToolProject } from '$lib/types/tool-project';

interface DesignModule {
  data: ToolProject;
}

// use an array to include *.ts AND explicitly exclude index.ts
const modules = import.meta.glob<DesignModule>(['./*.ts', '!./index.ts'], {
  eager: true
});

export const toolProjects: ToolProject[] = Object.values(modules)
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