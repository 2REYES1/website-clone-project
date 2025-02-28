import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point for the library
      name: 'UILibrary', // Global name (optional, for UMD builds)
      fileName: (format) => `ui-library.${format}.js`, // Output file name
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Exclude React from the bundle
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist', // Output directory
  },
});