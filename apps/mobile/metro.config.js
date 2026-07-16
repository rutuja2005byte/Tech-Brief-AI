const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('node:path');

const config = getDefaultConfig(__dirname);
const mobileNodeModules = path.resolve(__dirname, 'node_modules');

config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [mobileNodeModules, path.resolve(__dirname, '../../node_modules')];
config.resolver.extraNodeModules = {
  react: path.resolve(mobileNodeModules, 'react'),
  'react-dom': path.resolve(mobileNodeModules, 'react-dom'),
  'react-native': path.resolve(mobileNodeModules, 'react-native'),
  'react-native-web': path.resolve(mobileNodeModules, 'react-native-web')
};

module.exports = withNativeWind(config, { input: './src/styles/global.css' });
