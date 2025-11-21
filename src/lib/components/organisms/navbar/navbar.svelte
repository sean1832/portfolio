<script lang="ts">
	import ZekeZhangIcon from '$lib/components/icons/zekezhang.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
</script>

<nav class="fixed top-0 z-50 w-full">
	<div class="mx-auto flex items-center justify-between bg-background px-6 py-4">
		<!--logo-->
		<a href="/">
			<ZekeZhangIcon class="h-8 w-8" />
		</a>

		<!--navigation-->
		<div class="text-LG flex items-center gap-4 sm:gap-8 lg:gap-32">
			<a
				href="/#projects"
				class="min-w-12 hover:underline hover:underline-offset-4 sm:min-w-16 lg:min-w-20"
			>
				<Decoder
					text="PROJECTS"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
			<a href="/" class="min-w-12 hover:underline hover:underline-offset-4 sm:min-w-16 lg:min-w-20">
				<Decoder
					text="TOOLS"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
			<a href="/" class="min-w-12 hover:underline hover:underline-offset-4 sm:min-w-14 lg:min-w-15">
				<Decoder
					text="ABOUT"
					trigger="hover"
					variant="shuffle"
					scrambleSpeedMs={40}
					revealSpeedMs={40}
				/>
			</a>
		</div>
	</div>
</nav>
