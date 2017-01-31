import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: './src/main.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  plugins: [
    resolve({ jsnext: false, module: false }),
    commonjs({
      namedExports: {
        'node_modules/react/react.js': ['Component', 'PropTypes', 'Children', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/redux-saga/effects.js': ['fork', 'call', 'take', 'cancel', 'select', 'put', 'takeEvery']
      }
    }),
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ['transform-runtime', ['module-resolver', {
        root: ['./'],
        alias: {}
      }]],
      presets: ['es2015-rollup', 'react', 'stage-2'],
      runtimeHelpers: true
    })
  ]
};
