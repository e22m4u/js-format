import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/cjs/index.js',
  format: 'cjs',
  platform: 'node',
  target: ['node12'],
  bundle: true,
});
