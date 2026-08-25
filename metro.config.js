const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// react-async-hook@3.6.1 (via react-native-country-picker-modal) declares
// "module": "react-async-hook.esm.js" but ships the file inside dist/,
// which breaks web bundling. Redirect it to the real file.
const ALIASES = {
  'react-async-hook': 'react-async-hook/dist/react-async-hook.esm.js',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
};

module.exports = config;
