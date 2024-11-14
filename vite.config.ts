// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config
export default defineConfig({
  base:"MERN_ChatBot",
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'], // Ensure react and react-dom are included for optimization
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'], // Avoid marking react as external, ensure it's bundled
    },
  },
});
