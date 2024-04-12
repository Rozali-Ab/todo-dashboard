import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import cleanPlugin from 'vite-plugin-clean';

const PORT = 5000;

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // const env = loadEnv(mode, process.cwd(), '')

  const config = {
    plugins: [
      cleanPlugin({
        targets: ['./dist']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: PORT,
      open: true,
    },
    preview: {
      port: PORT,
      open: true,
    },
    // define: {
    //   __APP_ENV__: JSON.stringify(env.APP_ENV),
    // },
  }

  if (mode === 'production') {
    config.base = '/todo-dashboard'
  }

  return config;
})
