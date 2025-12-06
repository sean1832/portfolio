<script lang="ts">
	import { Marked } from 'marked';
	import markedAlert from 'marked-alert';
	import markedShiki from 'marked-shiki';
	import { createHighlighter, type Highlighter } from 'shiki';
	import LazyVideo from '../molecules/lazy-video.svelte';

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
	let articleEl: HTMLElement | undefined = $state(undefined);

	// Extract TOC entries from markdown (excluding code blocks)
	function extractToc(markdown: string): TocEntry[] {
		// First, remove all fenced code blocks to avoid matching headers inside them
		const codeBlockRegex = /```[\s\S]*?```|~~~[\s\S]*?~~~/g;
		const markdownWithoutCode = markdown.replace(codeBlockRegex, '');

		const headingRegex = /^(#{1,6})\s+(.+)$/gm;
		const entries: TocEntry[] = [];
		let match;

		while ((match = headingRegex.exec(markdownWithoutCode)) !== null) {
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
								const highlighted = hl.codeToHtml(code, {
									lang: lang || 'text',
									themes: {
										light: 'github-light',
										dark: 'github-dark'
									},
									defaultColor: false // Use CSS variables for both themes
								});
								// Wrap in container with floating copy button (GitHub style)
								return `<div class="code-block-wrapper">
<button class="code-copy-btn" type="button" aria-label="Copy code">
<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
<svg class="check-icon hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
</button>
${highlighted}
</div>`;
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
							},

							image({ href, title, text }) {
								if (!href) return '';
								const isVideo = /\.(mp4|webm|ogg|mov)($|\?)/i.test(href);
								if (isVideo) {
									return `
									<div class="video-wrapper my-4">
										<video 
											controls 
											playsinline 
											preload="metadata"
											class="w-full rounded-lg border bg-black/5"
											title="${title || text}"
										>
											<source src="${href}">
											<p>Your browser does not support the video tag.</p>
										</video>
									</div>`;
								}
								// Default image rendering behavior
								const titleAttr = title ? ` title="${title}"` : '';
								const altAttr = text ? ` alt="${text}"` : '';

								// Explicitly return img tag so we don't lose functionality
								return `<img src="${href}"${altAttr}${titleAttr} loading="lazy" class="rounded-lg my-4 max-w-full h-auto" />`;
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

	// Set up copy button event listeners after HTML is rendered
	$effect(() => {
		if (!articleEl || isLoading) return;

		const copyButtons = articleEl.querySelectorAll<HTMLButtonElement>('.code-copy-btn');

		function handleCopy(e: Event) {
			const btn = e.currentTarget as HTMLButtonElement;
			const wrapper = btn.closest('.code-block-wrapper');
			if (!wrapper) return;

			const codeEl = wrapper.querySelector('pre code');
			if (!codeEl) return;

			const code = codeEl.textContent || '';

			navigator.clipboard.writeText(code).then(() => {
				const copyIcon = btn.querySelector('.copy-icon');
				const checkIcon = btn.querySelector('.check-icon');

				copyIcon?.classList.add('hidden');
				checkIcon?.classList.remove('hidden');

				setTimeout(() => {
					copyIcon?.classList.remove('hidden');
					checkIcon?.classList.add('hidden');
				}, 2000);
			});
		}

		copyButtons.forEach((btn: HTMLButtonElement) => {
			btn.addEventListener('click', handleCopy);
		});

		return () => {
			copyButtons.forEach((btn: HTMLButtonElement) => {
				btn.removeEventListener('click', handleCopy);
			});
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
	<article bind:this={articleEl} class="prose {className}">
		{@html renderedHtml}
	</article>
{/if}
