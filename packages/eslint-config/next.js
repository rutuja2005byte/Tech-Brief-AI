import base from './index.js';

export default [
  ...base,
  {
    ignores: ['.next/**', 'next-env.d.ts']
  }
];
