import { designProjects } from '$lib/data/designs';
import { toolProjects } from '$lib/data/tools';

const siteUrl = 'https://zekezhang.com';

export const prerender = true;

interface SitemapPage {
	path: string;
	priority: number;
	changefreq: string;
	lastmod?: string;
}

export const GET = async () => {
	const staticPages: SitemapPage[] = [
		{ path: '', priority: 1.0, changefreq: 'weekly' },
		{ path: '/about', priority: 0.8, changefreq: 'monthly' },
		{ path: '/projects', priority: 0.9, changefreq: 'weekly' },
		{ path: '/tools', priority: 0.8, changefreq: 'weekly' }
	];

	const projectPages: SitemapPage[] = designProjects.map((project) => ({
		path: `/projects/${project.slug}`,
		priority: 0.7,
		changefreq: 'monthly',
		lastmod: `${project.year}-01-01`
	}));

	const toolPages: SitemapPage[] = toolProjects.map((tool) => ({
		path: `/tools/${tool.slug}`,
		priority: 0.6,
		changefreq: 'monthly',
		lastmod: `${tool.year}-01-01`
	}));

	const allPages: SitemapPage[] = [...staticPages, ...projectPages, ...toolPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
