import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default defineConfig(({mode}) => {
  if (mode === 'development') {
    return {
      plugins: [react()],
      root: './dev',
      envDir: __dirname,
      publicDir: false
    };
  }

  return {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MyRTKModule',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-redux': 'ReactRedux',
            '@reduxjs/toolkit': 'RTK'
          }
        }
      }
    }
  }

});
