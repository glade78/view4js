import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
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
            exclude: 'node_modules/**'
        })
    ]
};