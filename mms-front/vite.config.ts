/// <reference types="vitest" />

import path from 'path';
import fs from 'fs';

import { defineConfig, loadEnv } from 'vite';
// import ssr from 'vite-plugin-ssr/plugin';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

const rootPath = __dirname;

const basePath = path.resolve(rootPath, './src');
const srcDirs = fs
  .readdirSync(basePath)
  .filter((name) => fs.lstatSync(path.join(basePath, name)).isDirectory());

const srcAliases = srcDirs.reduce(
  (acc: any, name: any) => ({
    ...acc,
    [`~${name}`]: `${path.resolve(rootPath, 'src')}/${name}`,
  }),
  {}
);

export default ({ mode }: { mode: string }) => {
  const viteEnv = loadEnv(mode, './envs');
  process.env = { ...process.env, ...viteEnv };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: ['@emotion/babel-plugin', jotaiDebugLabel, jotaiReactRefresh],
        },
      }),
      // ssr(),
      checker({
        typescript: true,
      }),
      eslint(),
      svgr(),
      // chunkSplitPlugin({
      //   strategy: 'single-vendor',
      //   customChunk: (args) => {
      //     // files into pages directory is export in single files
      //     let { file, id, moduleId, root } = args;
      //     if (
      //       file.startsWith('src/pages/') ||
      //       file.startsWith('src/widgets/') ||
      //       file.startsWith('src/entities/') ||
      //       file.startsWith('src/features/') ||
      //       file.startsWith('src/shared/lib') ||
      //       file.startsWith('src/shared/ui/controls') ||
      //       file.startsWith('src/shared/ui/data-display') ||
      //       file.startsWith('src/shared/ui/layout') ||
      //       file.startsWith('src/shared/ui/form') ||
      //       file.startsWith('src/shared/ui/feedback') ||
      //       file.startsWith('src/shared/ui/utils') ||
      //       file.startsWith('src/shared/ui/logo') ||
      //       file.startsWith('src/shared/ui/Icons') ||
      //       file.startsWith('src/shared/ui/charts') ||

      //       file.startsWith('src/shared/model') ||
      //       file.startsWith('src/shared/api')
      //     ) {
      //       file = file.substring(4);
      //       file = file.replace(/\.[^.$]+$/, '');
      //       return file;
      //     }
      //     return null;
      //   },
      //   customSplitting: {
      //     // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
      //     'react-vendor': ['react', 'react-dom'],
      //     // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
      //     // 'utils': [/src\/utils/]
      //   }
      // }),
    ],
    envDir: './envs',
    resolve: {
      alias: {
        ...srcAliases,
      },
    },
    server: {
      port: 3000
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/shared/lib/test/setup.ts',
    },
  });
};
