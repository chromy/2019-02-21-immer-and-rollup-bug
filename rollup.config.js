import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  output: {name: 'example'},
  plugins: [
    nodeResolve({browser: true}),
    commonjs(),
  ]
}
