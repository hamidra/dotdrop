import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    resolve: {
      // alias for resolving bootstrap scss
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      },
    },
    // sets base url to the repo name, enabling github pages deployment to work.
    base: '/dotdrop/',
    plugins: [react()],
  };
});
