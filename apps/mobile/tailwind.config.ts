import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#0B0D12',
        panel: '#151922',
        mist: '#EEF2F8',
        accent: '#4F8CFF',
        signal: '#14B8A6'
      }
    }
  },
  plugins: []
};

export default config;
