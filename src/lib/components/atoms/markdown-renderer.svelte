<script lang="ts">
	import { Marked } from 'marked';
	import markedAlert from 'marked-alert';
	import markedShiki from 'marked-shiki';
	import { createHighlighter, type Highlighter } from 'shiki';

	export interface TocEntry {
		id: string;
		text: string;
		level: number;
	}

	interface Props {
		content: string;
		class?: string;
		tocEntries?: TocEntry[];
	}

	let { content, class: className = '', tocEntries = $bindable([]) }: Props = $props();

	let renderedHtml = $state('');
	let isLoading = $state(true);

	// Extract TOC entries from markdown
	function extractToc(markdown: string): TocEntry[] {
		const headingRegex = /^(#{1,6})\s+(.+)$/gm;
		const entries: TocEntry[] = [];
		let match;

		while ((match = headingRegex.exec(markdown)) !== null) {
			const level = match[1].length;
			const text = match[2].trim();
			// Generate slug for ID (same algorithm as marked uses)
			const id = text
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim();

			entries.push({ id, text, level });
		}

		return entries;
	}

	$effect(() => {
		let highlighter: Highlighter | null = null;

		async function initMarkdown() {
			isLoading = true;

			try {
				// Create shiki highlighter
				highlighter = await createHighlighter({
					themes: ['github-dark', 'github-light'],
					langs: [
						'typescript',
						'javascript',
						'python',
						'bash',
						'shell',
						'json',
						'go',
						'rust',
						'html',
						'css',
						'yaml',
						'markdown',
						'text'
					]
				});

				const hl = highlighter; // Capture for closure

				// Configure marked with plugins
				const marked = new Marked()
					.use(markedAlert())
					.use(
						markedShiki({
							highlight(code, lang) {
								return hl.codeToHtml(code, {
									lang: lang || 'text',
									themes: {
										light: 'github-light',
										dark: 'github-dark'
									}
								});
							}
						})
					)
					.use({
						renderer: {
							// Add IDs to headings for TOC navigation
							heading({ tokens, depth }) {
								const text = tokens.map((t) => ('text' in t ? t.text : '')).join('');
								const id = text
									.toLowerCase()
									.replace(/[^\w\s-]/g, '')
									.replace(/\s+/g, '-')
									.replace(/-+/g, '-')
									.trim();
								return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;
							},
							// External links open in new tab
							link({ href, title, tokens }) {
								const text = this.parser.parseInline(tokens);
								const isExternal = href.startsWith('http://') || href.startsWith('https://');
								const titleAttr = title ? ` title="${title}"` : '';

								if (isExternal) {
									return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
								}
								return `<a href="${href}"${titleAttr}>${text}</a>`;
							}
						}
					});

				// Extract TOC before rendering
				tocEntries = extractToc(content);

				// Render markdown
				renderedHtml = await marked.parse(content);
			} catch (e) {
				console.error('Markdown rendering failed:', e);
				renderedHtml = `<pre class="text-destructive">${content}</pre>`;
			} finally {
				isLoading = false;
			}
		}

		initMarkdown();

		return () => {
			if (highlighter) {
				highlighter.dispose();
			}
		};
	});
</script>

{#if isLoading}
	<div class="space-y-4">
		<div class="h-6 w-3/4 animate-pulse bg-muted"></div>
		<div class="h-4 w-full animate-pulse bg-muted"></div>
		<div class="h-4 w-5/6 animate-pulse bg-muted"></div>
		<div class="h-4 w-2/3 animate-pulse bg-muted"></div>
	</div>
{:else}
	<article class="prose {className}">
		{@html renderedHtml}
	</article>
{/if}
