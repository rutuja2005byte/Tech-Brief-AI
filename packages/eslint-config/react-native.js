import base from './index.js';

export default [
  {
    ignores: ['.expo/**', '**/*.d.ts', 'babel.config.js', 'dist/**', 'metro.config.js']
  },
  ...base,
  {
    languageOptions: {
      globals: {
        fetch: 'readonly',
        process: 'readonly',
        require: 'readonly'
      }
    }
  }
];
