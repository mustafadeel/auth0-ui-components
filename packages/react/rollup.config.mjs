import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
  external: ['react', 'react-dom', '@auth0-web-ui-components/core'],
  plugins: [
    alias({
      entries: [{ find: '@core', replacement: '../../core/src' }],
    }),
    postcss({
      extract: true,  // Extracts the CSS into a separate file
      inject: true,   // Injects CSS into the HTML
      config: {
        path: './postcss.config.mjs', // Pointing to your PostCSS config
      },
    }),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
