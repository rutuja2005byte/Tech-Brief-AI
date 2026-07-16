import base from './index.js';

export default [
  {
    ignores: ['.next/**', '**/*.d.ts']
  },
  ...base,
  {
    languageOptions: {
      globals: {
        Request: 'readonly',
        Response: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        process: 'readonly'
      }
    }
  }
];
