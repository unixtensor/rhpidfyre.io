// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	integrations: [vue()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler' // or "modern"
				}
			}
		}
	}
});
