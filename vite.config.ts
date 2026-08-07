import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { guestsApiPlugin } from './plugins/guestsApiPlugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Expose admin password to local API middleware
  process.env.ADMIN_PASSWORD = env.ADMIN_PASSWORD || env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  process.env.BLOB_READ_WRITE_TOKEN =
    env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

  return {
    plugins: [react(), tailwindcss(), guestsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});

