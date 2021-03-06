// @ts-check
import { builtinModules } from 'module'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'

/**
 * @param {import('rollup').ModuleFormat} format
 * @returns {import('rollup').RollupOptions}
 */
function config (format) {
  return {
    input: 'src/nbt.js',
    output: [{ file: `dist/nbt.${format}.js`, format }],
    plugins: [
      nodeResolve({
        preferBuiltins: format === 'cjs',
        customResolveOptions: { moduleDirectory: ['node_modules', 'custom_modules'] }
      }),
      commonjs({
        namedExports: { 'protodef': Object.keys(require('protodef')) }
      }),
      json()
    ],
    external: format === 'cjs' ? builtinModules : []
  }
}

export default [config('es'), config('cjs')]
