import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { r } from './script/utils';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': r('./src'),
		},
	},
});
