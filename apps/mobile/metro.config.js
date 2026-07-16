const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const config = getDefaultConfig(__dirname);
const mobileNodeModules = path.resolve(__dirname, 'node_modules');
const routerContextModule = path.resolve(__dirname, 'src/router-ctx.js');
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [mobileNodeModules, path.resolve(__dirname, '../../node_modules')];
config.resolver.extraNodeModules = {
  react: path.resolve(mobileNodeModules, 'react'),
  'react-dom': path.resolve(mobileNodeModules, 'react-dom'),
  'react-native': path.resolve(mobileNodeModules, 'react-native'),
  'react-native-web': path.resolve(mobileNodeModules, 'react-native-web')
};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'expo-router/_ctx') {
    return {
      filePath: routerContextModule,
      type: 'sourceFile'
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
