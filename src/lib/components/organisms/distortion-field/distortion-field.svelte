<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	interface Props {
		class?: string;
		gridSpacing?: number;
		pointSize?: number;
		pointVariant?: 'circle' | 'cross' | 'cross45' | 'square';
		mouseRadius?: number;
		mouseForce?: number;
		springStiffness?: number;
		springDampting?: number;
		color?: string;
		backgroundColor?: string;
		showStats?: boolean;
	}

	let {
		class: className = '',
		gridSpacing = 45,
		pointSize = 3.5,
		pointVariant = 'circle',
		mouseRadius = 200,
		mouseForce = 200,
		springStiffness = 0.01,
		springDampting = 0.9,
		color = '#000000', // dot color: black
		backgroundColor = '#ffffff', // background color: white
		showStats = false
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let statsEl = $state<HTMLDivElement>();
	let container: HTMLDivElement;

	// physics store
	// stride = 4: [x, y, vx, vy]
	const STRIDE = 4;
	const OFF_X = 0;
	const OFF_Y = 1;
	const OFF_VX = 2; // velocity X
	const OFF_VY = 3; // velocity Y

	let physicsData = new Float32Array(0);
	let cols = 0;
	let rows = 0;
	let pointCount = 0;

	// interactios & states
	const mouse = { x: -1000, y: -1000 }; // outside of the screen initially
	let width = 0;
	let height = 0;
	let lastTime = 0;
	let frameCount = 0;
	let animationFrameId: number;
	let ctx: CanvasRenderingContext2D | null = null;

	function resize() {
		if (!container || !canvas) return;
		width = container.clientWidth;
		height = container.clientHeight;

		canvas.width = width;
		canvas.height = height;

		// discretizing
		cols = Math.ceil(width / gridSpacing) + 1;
		rows = Math.ceil(height / gridSpacing) + 1;
		pointCount = cols * rows;

		// re-allocate buffer if needed
		const requireSize = pointCount * STRIDE;
		if (physicsData.length < requireSize) {
			physicsData = new Float32Array(requireSize);
		}

		// initialize positions
		for (let i = 0; i < pointCount; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);
			const baseX = col * gridSpacing;
			const baseY = row * gridSpacing;

			const idx = i * STRIDE; // spacing
			physicsData[idx + OFF_X] = baseX;
			physicsData[idx + OFF_Y] = baseY;
			physicsData[idx + OFF_VX] = 0;
			physicsData[idx + OFF_VY] = 0;
		}
	}

	function updatePhysics() {
		const radiusSq = mouseRadius * mouseRadius;

		for (let i = 0; i < pointCount; i++) {
			const idx = i * STRIDE; // spacing

			// get current state
			const x = physicsData[idx + OFF_X];
			const y = physicsData[idx + OFF_Y];
			let velocityX = physicsData[idx + OFF_VX];
			let velocityY = physicsData[idx + OFF_VY];

			// calculate target base position
			const col = i % cols;
			const row = Math.floor(i / cols);
			const targetX = col * gridSpacing;
			const targetY = row * gridSpacing;

			// calculate mouse repulsion
			const dx = x - mouse.x;
			const dy = y - mouse.y;
			const distSq = dx * dx + dy * dy;

			if (distSq < radiusSq) {
				// TODO: perf: avoid Math.Sqrt if possible, needed here for linear falloff
				const dist = Math.sqrt(distSq);
				if (dist > 0) {
					const f = (1 - dist / mouseRadius) * mouseForce;
					// use 0.01 as timestep factor
					const invDist = 1 / dist; // TODO: perf: use multiplication if possible
					velocityX += dx * invDist * f * 0.01;
					velocityY += dy * invDist * f * 0.01;
				}
			}

			// apply spring force
			const ex = x - targetX;
			const ey = y - targetY;

			velocityX -= ex * springStiffness;
			velocityY -= ey * springStiffness;

			// apply damping
			velocityX *= springDampting;
			velocityY *= springDampting;

			// update data
			physicsData[idx + OFF_X] = x + velocityX;
			physicsData[idx + OFF_Y] = y + velocityY;
			physicsData[idx + OFF_VX] = velocityX;
			physicsData[idx + OFF_VY] = velocityY;
		}
	}

	// draw shape variants (branch before hot path to avoid checks)
	function drawCircle(ctx: CanvasRenderingContext2D, limit: number, radius: number) {
		for (let idx = 0; idx < limit; idx += STRIDE) {
			const x = physicsData[idx + OFF_X];
			const y = physicsData[idx + OFF_Y];
			if (x < -50 || x > width + 50 || y < -50 || y > height + 50) continue;
			ctx.moveTo(x + radius, y);
			ctx.arc(x, y, radius, 0, Math.PI * 2);
		}

		ctx.fill();
	}

	function drawSqaure(ctx: CanvasRenderingContext2D, limit: number, radius: number) {
		// use rect(), implicitly handles the new sub-path, no moveTo needed
		for (let idx = 0; idx < limit; idx += STRIDE) {
			const x = physicsData[idx + OFF_X];
			const y = physicsData[idx + OFF_Y];
			if (x < -50 || x > width + 50 || y < -50 || y > height + 50) continue;
			ctx.rect(x - radius, y - radius, pointSize, pointSize);
		}
		ctx.fill();
	}

	function drawCross(ctx: CanvasRenderingContext2D, limit: number, radius: number) {
		ctx.lineWidth = Math.max(1, pointSize * 0.3); // propotional thickness

		for (let idx = 0; idx < limit; idx += STRIDE) {
			const x = physicsData[idx + OFF_X];
			const y = physicsData[idx + OFF_Y];
			if (x < -50 || x > width + 50 || y < -50 || y > height + 50) continue;
			// Vertical + Horizontal
			ctx.moveTo(x, y - radius);
			ctx.lineTo(x, y + radius);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
		}

		ctx.stroke();
	}

	function drawCross45(ctx: CanvasRenderingContext2D, limit: number, radius: number) {
		ctx.lineWidth = Math.max(1, pointSize * 0.3); // propotional thickness

		for (let idx = 0; idx < limit; idx += STRIDE) {
			const x = physicsData[idx + OFF_X];
			const y = physicsData[idx + OFF_Y];
			if (x < -50 || x > width + 50 || y < -50 || y > height + 50) continue;
			// Diagonal X
			ctx.moveTo(x - radius, y - radius);
			ctx.lineTo(x + radius, y + radius);
			ctx.moveTo(x + radius, y - radius);
			ctx.lineTo(x - radius, y + radius);
		}

		ctx.stroke();
	}

	// rendering
	function render() {
		if (!ctx) return;

		// clear background
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = color;
		const radius = pointSize / 2;
		const limit = pointCount * STRIDE;

		// batch rendering
		ctx.beginPath();

		if (pointVariant === 'circle') {
			drawCircle(ctx, limit, radius);
		} else if (pointVariant === 'square') {
			drawSqaure(ctx, limit, radius);
		} else if (pointVariant === 'cross') {
			drawCross(ctx, limit, radius);
		} else if (pointVariant === 'cross45') {
			drawCross45(ctx, limit, radius);
		}
	}

	function loop(timestamp: number) {
		if (timestamp - lastTime >= 1000) {
			if (showStats && statsEl) {
				statsEl.innerText = `ENTITIES: ${pointCount} | FPS: ${frameCount}`;
			}
			frameCount = 0;
			lastTime = timestamp;
		}
		frameCount++;

		updatePhysics();
		render();
		animationFrameId = requestAnimationFrame(loop);
	}

	// input handler
	let lastTouchTime = 0;

	function handleMouseMove(e: MouseEvent) {
		// Ignore synthetic mouse events from touch
		if (performance.now() - lastTouchTime < 500) return;

		const rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	}

	function handleTouchStart() {
		lastTouchTime = performance.now();
	}

	function handleTouchMove(e: TouchEvent) {
		if (e.touches.length > 0) {
			lastTouchTime = performance.now();
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.touches[0].clientX - rect.left;
			mouse.y = e.touches[0].clientY - rect.top;
		}
	}

	function handleEnd() {
		mouse.x = -1000;
		mouse.y = -1000;
	}

	// trigger
	onMount(() => {
		if (!canvas) return;

		ctx = canvas.getContext('2d', { alpha: false });
		// ResizeObserver for robust responsiveness
		const resizeObserver = new ResizeObserver(() => {
			resize();
		});
		resizeObserver.observe(container);

		// initial boot
		resize();
		animationFrameId = requestAnimationFrame(loop);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div bind:this={container} class={cn('h-full w-full overflow-hidden select-none', className)}>
	<canvas
		bind:this={canvas}
		onmousemove={handleMouseMove}
		onmouseleave={handleEnd}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleEnd}
		ontouchcancel={handleEnd}
		class="block"
	></canvas>

	{#if showStats}
		<div
			class="pointer-events-none absolute bottom-8 left-8 text-xs font-medium tracking-wider text-primary mix-blend-difference"
		>
			<div>ZEN_GRID // MINIMAL</div>
			<div bind:this={statsEl}>ENTITIES: 0 | FPS: 0</div>
		</div>
	{/if}
</div>
