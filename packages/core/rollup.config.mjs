import { createBaseConfig } from '../../rollup.base.mjs';

export default createBaseConfig({
  input: 'src/index.ts',
  outputDir: 'dist',
  tsconfig: './tsconfig.json',
  external: [],
  useBabel: false,
});
