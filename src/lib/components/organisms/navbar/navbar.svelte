<script lang="ts">
	import { onMount } from 'svelte';
	import ZekeZhangIcon from '$lib/components/icons/zekezhang.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import { navbarState } from '$lib/hooks/navbar-state.svelte';

	let isMobileMenuOpen = $state(false);

	function openMobileMenu() {
		isMobileMenuOpen = true;
		// Prevent body scroll when menu is open
		document.body.style.overflow = 'hidden';
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
		document.body.style.overflow = '';
	}

	// Update scroll position
	onMount(() => {
		const handleScroll = () => {
			navbarState.updateScroll(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll);
			// Cleanup body overflow on unmount
			document.body.style.overflow = '';
		};
	});
</script>

<nav
	class="fixed top-0 z-50 w-full transition-all duration-300 {navbarState.isTransparent &&
	!navbarState.isPastHero
		? ''
		: 'bg-background'}"
>
	<div
		class="mx-auto flex items-center justify-between px-6 py-4 transition-colors duration-300 {navbarState.isTransparent &&
		!navbarState.isPastHero
			? 'text-white'
			: 'text-foreground'}"
	>
		<!--logo-->
		<a href="/">
			<ZekeZhangIcon class="h-8 w-8" animated />
		</a>

		<!--desktop navigation-->
		<div class="hidden items-center gap-8 text-lg sm:flex lg:gap-32">
			<a href="/#designs" class="min-w-16 hover:underline hover:underline-offset-4 lg:min-w-20">
				<Decoder
					text="DESIGNS"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
			<a href="/tools" class="min-w-16 hover:underline hover:underline-offset-4 lg:min-w-20">
				<Decoder
					text="TOOLS"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
			<a href="/about" class="min-w-14 hover:underline hover:underline-offset-4 lg:min-w-15">
				<Decoder
					text="ABOUT"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
		</div>

		<!--mobile hamburger button-->
		<button
			onclick={openMobileMenu}
			class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
			aria-label="Open menu"
		>
			<span class="h-0.5 w-6 bg-current transition-transform"></span>
			<span class="h-0.5 w-6 bg-current transition-opacity"></span>
			<span class="h-0.5 w-6 bg-current transition-transform"></span>
		</button>
	</div>
</nav>

<!--mobile menu-->
<MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
