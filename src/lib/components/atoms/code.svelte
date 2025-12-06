<script lang="ts">
	import { Check, Copy } from '@lucide/svelte';
	import { createHighlighter } from 'shiki';

	interface Props {
		code: string;
		lang?: string;
	}

	let { code, lang = 'text' }: Props = $props();

	let copied = $state(false);
	let highlightedHtml = $state('');
	let isLoading = $state(true);

	$effect(() => {
		let highlighter: any;

		async function initHighlight() {
			isLoading = true;
			try {
				highlighter = await createHighlighter({
					themes: ['github-light'],
					langs: ['go', 'typescript', 'python', 'bash', 'json', 'shell', 'bash']
				});

				highlightedHtml = highlighter.codeToHtml(code, {
					lang,
					theme: 'github-light'
				});
			} catch (e) {
				console.error('Highlighting failed', e);
				highlightedHtml = `<pre><code>${code}</code></pre>`;
			} finally {
				isLoading = false;
			}
		}

		initHighlight();
	});

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy!', err);
		}
	}
</script>

<div class="border border-border bg-secondary/30">
	<!-- Header -->
	<div class="flex items-center justify-between border-b border-border px-4 py-2">
		<span class="font-mono text-xs tracking-wide text-muted-foreground uppercase">{lang}</span>

		<button
			onclick={handleCopy}
			class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			aria-label="Copy code"
		>
			{#if copied}
				<Check class="h-4 w-4" />
			{:else}
				<Copy class="h-4 w-4" />
			{/if}
		</button>
	</div>

	<!-- Code block -->
	<div class="overflow-x-auto p-4 font-mono text-sm">
		{#if isLoading}
			<div class="space-y-2">
				<div class="h-4 w-2/3 bg-muted"></div>
				<div class="h-4 w-1/2 bg-muted"></div>
				<div class="h-4 w-3/4 bg-muted"></div>
			</div>
		{:else}
			{@html highlightedHtml}
		{/if}
	</div>
</div>

<style>
	:global(.shiki) {
		background-color: transparent !important;
		margin: 0;
		padding: 0;
	}

	:global(.shiki code) {
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, 'Cascadia Code', Consolas,
			'Liberation Mono', 'Courier New', monospace;
	}
</style>
