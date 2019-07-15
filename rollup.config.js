import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/view4js.js',
        format: 'umd',
        freeze: false,
        name: 'view4js'
    },
    plugins: [
        resolve({
            module: true,
            jsnext: true,
            main: true,
            modulesOnly: true,
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: ["@babel/plugin-proposal-export-default-from"]
        }),
        uglify({
            compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }})
    ]
};