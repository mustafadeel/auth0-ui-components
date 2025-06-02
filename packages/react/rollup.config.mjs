import postcss from 'rollup-plugin-postcss';
import { createBaseConfig } from '../../rollup.base.mjs';

export default createBaseConfig({
  input: 'src/index.ts',
  outputDir: 'dist',
  tsconfig: './tsconfig.json',
  useBabel: true,
  babelPresets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  additionalPlugins: [
    postcss({
      extract: true,
      modules: false,
    }),
  ],
});
