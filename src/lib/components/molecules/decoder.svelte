<script lang="ts">
	import { cn } from '$lib/utils';
	import { ScrambleStrategy, ShuffleStrategy, TextAnimator } from '$lib/helpers/text-animator';
	import { onDestroy, onMount } from 'svelte';

	// props
	export let text: string | string[] = '';
	export let className = '';
	export let revealSpeedMs = 50;
	export let scrambleSpeedMs = 50;
	export let pauseDurationMs = 2000; // pause between texts in multi-text mode
	export let loop = true; // whether to loop through texts
	/** Which decoding effect to use */
	export let variant: 'scramble' | 'shuffle' = 'scramble';
	/** when to trigger the animation */
	export let trigger: 'load' | 'hover' | 'manual' = 'load';

	let el: HTMLDivElement;
	let animator: TextAnimator;

	const strategies = {
		scramble: new ScrambleStrategy(),
		shuffle: new ShuffleStrategy()
	};

	// event handler for mouse hover.
	// store it in a variable so it can be properly removed in onDestroy.
	let handleMouseEnter: () => void;
	let handleMouseLeave: () => void;

	onMount(() => {
		if (!el) return;

		// manually set the initial text for the constructor to read
		const initialText = Array.isArray(text) ? text[0] : text;
		el.textContent = initialText;

		// initialize decoder with text(s)
		const initialStrategy = strategies[variant];
		animator = new TextAnimator(el, initialStrategy, text);
		animator.config = {
			revealSpeedMs: revealSpeedMs,
			scrambleSpeedMs: scrambleSpeedMs,
			pauseDurationMs: pauseDurationMs,
			loop: loop
		};
		if (trigger === 'load') {
			animator.start();
		} else if (trigger === 'hover') {
			handleMouseEnter = () => animator.start();
			handleMouseLeave = () => animator.stop();
			el.addEventListener('mouseenter', handleMouseEnter);
			el.addEventListener('mouseleave', handleMouseLeave);
		} else if (trigger === 'manual') {
			// do nothing and wait for parent to call start()
		}
	});

	onDestroy(() => {
		// cleanup animation loop when component is removed
		animator?.stop();

		if (trigger === 'hover' && el) {
			el.removeEventListener('mouseenter', handleMouseEnter);
			el.removeEventListener('mouseleave', handleMouseLeave);
		}
	});

	// reactive block to handle text changes
	$: if (animator && text) {
		if (Array.isArray(text)) {
			// check if texts array changed
			if (JSON.stringify(text) !== JSON.stringify(animator.texts)) {
				animator.setTexts(text);
			}
		} else {
			// single text mode
			if (text !== animator.targetText) {
				animator.setText(text);
			}
		}
	}

	// reactive block to update config when props change
	$: if (animator) {
		animator.config = {
			revealSpeedMs: revealSpeedMs,
			scrambleSpeedMs: scrambleSpeedMs,
			pauseDurationMs: pauseDurationMs,
			loop: loop
		};
	}

	$: if (animator && strategies[variant] !== animator.strategy) {
		animator.setStrategy(strategies[variant]);
	}

	// export methods for manual control
	export function start() {
		animator?.start();
	}

	export function stop() {
		animator?.stop();
	}
</script>

<div bind:this={el} class={cn('', className)}></div>
