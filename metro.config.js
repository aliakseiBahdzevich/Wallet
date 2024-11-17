// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);


const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: getDefaultConfig().resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...getDefaultConfig().resolver.sourceExts, 'svg'],
  },
});
module.exports = wrapWithReanimatedMetroConfig(config);

// module.exports = mergeConfig(getDefaultConfig(__dirname), {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: getDefaultConfig().resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...getDefaultConfig().resolver.sourceExts, 'svg'],
//   },
// });

