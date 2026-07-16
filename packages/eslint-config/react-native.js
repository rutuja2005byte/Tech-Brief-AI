import base from './index.js';

export default [
  ...base,
  {
    ignores: ['.expo/**', 'babel.config.js', 'dist/**', 'metro.config.js']
  }
];
