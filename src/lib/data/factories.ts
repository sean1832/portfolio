import type { Contribution } from '$lib/types/project';

export function makeContribution(description: string, percent: number): Contribution {
	// Hard validation: Break the build if data is bad.
	if (percent < 0 || percent > 100) {
		throw new Error(
			`[Data Error]: Contribution "${description}" has invalid percentage: ${percent}`
		);
	}
	return { description, percent };
}
