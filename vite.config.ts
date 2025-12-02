import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools'; // Vite plugin for image optimization and processing
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	plugins: [
		tailwindcss(),
		sveltekit(),
		// Only include imagetools in production for faster dev builds
		mode !== 'development' && imagetools()
	].filter(Boolean)
}));
