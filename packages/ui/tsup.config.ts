import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react'],
  injectStyle: true,
  splitting: false,
  sourcemap: true,
  minify: true,
});