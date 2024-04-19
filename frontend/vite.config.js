import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});

// plugins: [million.vite({ auto: true }), react()], con million
// plugins: [react()],    sin million
