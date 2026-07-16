const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const fs = require('node:fs');

const config = getDefaultConfig(__dirname);
const mobileRoot = path.resolve(__dirname, 'apps/mobile');
const mobileNodeModules = path.resolve(mobileRoot, 'node_modules');
const rootNodeModules = path.resolve(__dirname, 'node_modules');
const routerContextModule = path.resolve(mobileRoot, 'src/router-ctx.js');
const defaultResolveRequest = config.resolver.resolveRequest;

config.watchFolders = [mobileRoot];
config.resolver.nodeModulesPaths = [mobileNodeModules, rootNodeModules];
config.resolver.extraNodeModules = {
  '@expo/metro-runtime': path.resolve(mobileNodeModules, '@expo/metro-runtime'),
  '@': path.resolve(mobileRoot, 'src'),
  'expo-router': path.resolve(mobileNodeModules, 'expo-router'),
  react: path.resolve(mobileNodeModules, 'react'),
  'react-dom': path.resolve(mobileNodeModules, 'react-dom'),
  'react-native': path.resolve(rootNodeModules, 'react-native'),
  'react-native-web': path.resolve(mobileNodeModules, 'react-native-web')
};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'expo-router/_ctx') {
    return {
      filePath: routerContextModule,
      type: 'sourceFile'
    };
  }

  if (moduleName.startsWith('@/')) {
    const aliasTarget = path.resolve(mobileRoot, 'src', moduleName.slice(2));
    const filePath = resolveWithExtension(aliasTarget);

    return {
      filePath,
      type: 'sourceFile'
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

function resolveWithExtension(filePath) {
  const extensions = ['', '.ts', '.tsx', '.js', '.jsx'];

  for (const extension of extensions) {
    const candidate = `${filePath}${extension}`;

    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return filePath;
}
