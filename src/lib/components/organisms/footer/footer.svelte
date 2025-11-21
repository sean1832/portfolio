<script lang="ts">
	import { ZekeZhangIcon } from '$lib/components/icons';
	import Decoder from '$lib/components/molecules/decoder.svelte';

	const decoderSpeed = 45;
</script>

<footer
	class="flex flex-col items-start gap-6 p-4 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
>
	<div class="flex gap-4">
		<ZekeZhangIcon />
		<div>© zekezhang.com 2025</div>
	</div>

	<!--contacts-->
	<div class="flex flex-col gap-1 text-left lg:text-right">
		<a href="https://github.com/sean1832" target="_blank" class="hover:underline">
			<Decoder
				text="GITHUB"
				scrambleSpeedMs={decoderSpeed}
				revealSpeedMs={decoderSpeed}
				trigger="hover"
				variant="shuffle"
			/>
		</a>
		<a
			href="https://www.linkedin.com/in/zeke-zhang-3b9a2b191/"
			target="_blank"
			class="hover:underline"
		>
			<Decoder
				text="LINKEDIN"
				scrambleSpeedMs={decoderSpeed}
				revealSpeedMs={decoderSpeed}
				trigger="hover"
				variant="shuffle"
			/>
		</a>
		<a href="https://www.instagram.com/seanzhang9266/" target="_blank" class="hover:underline">
			<Decoder
				text="INSTAGRAM"
				scrambleSpeedMs={decoderSpeed}
				revealSpeedMs={decoderSpeed}
				trigger="hover"
				variant="shuffle"
			/>
		</a>
	</div>
</footer>
