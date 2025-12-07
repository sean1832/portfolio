<script lang="ts">
	import { cn } from '$lib/utils';
	import Decoder from '$lib/components/molecules/decoder.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	const navLinks = [
		{ href: '/#projects', label: 'PROJECTS' },
		{ href: '/tools', label: 'TOOLS' },
		{ href: '/about', label: 'ABOUT' }
	];

	function handleLinkClick() {
		onClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop -->
<button
	class={cn(
		'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
		isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
	)}
	onclick={onClose}
	aria-label="Close menu"
	tabindex={isOpen ? 0 : -1}
></button>

<!-- Menu Panel -->
<div
	class={cn(
		'fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-background transition-transform duration-300 ease-out',
		isOpen ? 'translate-x-0' : 'translate-x-full'
	)}
	role="dialog"
	aria-modal="true"
	aria-label="Navigation menu"
>
	<!-- Header with close button -->
	<div class="flex items-center justify-end px-6 py-4">
		<button
			onclick={onClose}
			class="group flex h-10 w-10 items-center justify-center border border-foreground transition-colors hover:bg-foreground hover:text-background"
			aria-label="Close menu"
		>
			<svg
				class="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	</div>

	<!-- Navigation Links -->
	<nav class="flex flex-1 flex-col justify-center px-6">
		{#each navLinks as link}
			<a
				href={link.href}
				onclick={handleLinkClick}
				class="group py-6 transition-colors hover:bg-foreground hover:text-background"
			>
				<div class="flex items-center justify-between px-4">
					<span class="text-3xl font-light tracking-wider">
						{#if isOpen}
							<Decoder
								text={link.label}
								trigger="load"
								variant="shuffle"
								scrambleSpeedMs={30}
								revealSpeedMs={50}
							/>
						{:else}
							{link.label}
						{/if}
					</span>
				</div>
			</a>
		{/each}
	</nav>

	<!-- Footer -->
	<div class="border-t border-foreground px-6 py-6">
		<p class="text-center text-xs tracking-widest text-muted-foreground">ZEKE ZHANG © 2025</p>
	</div>
</div>
