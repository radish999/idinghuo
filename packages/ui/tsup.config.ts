import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    '@emotion/react',
    '@emotion/styled',
    '@mui/material',
    '@mui/icons-material'
  ]
});