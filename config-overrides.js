/* config-overrides.js */
const webpack = require("webpack");

module.exports = function override(config, env) {
  const newConfig = {
    ...config,
    resolve: {
      ...config.resolve,
      // Use our versions of Node modules.
      alias: {
        ...config.resolve.alias,
        fs: "browserfs/dist/shims/fs.js",
        buffer: "browserfs/dist/shims/buffer.js",
        path: "browserfs/dist/shims/path.js",
        processGlobal: "browserfs/dist/shims/process.js",
        bufferGlobal: "browserfs/dist/shims/bufferGlobal.js",
        bfsGlobal: require.resolve("browserfs")
      }
    },
    // REQUIRED to avoid issue "Uncaught TypeError: BrowserFS.BFSRequire is not a function"
    // See: https://github.com/jvilk/BrowserFS/issues/201
    module: {
      ...config.module,
      noParse: /browserfs\.js/
    },
    plugins: [
      ...config.plugins,
      // Expose BrowserFS, process, and Buffer globals.
      // NOTE: If you intend to use BrowserFS in a script tag, you do not need
      // to expose a BrowserFS global.
      new webpack.ProvidePlugin({
        BrowserFS: "bfsGlobal",
        process: "processGlobal",
        Buffer: "bufferGlobal"
      })
    ],
    // DISABLE Webpack's built-in process and Buffer polyfills!
    node: {
      ...config.node,
      process: true,
      Buffer: false
    }
  };
  delete newConfig.resolve.plugins.ModuleScopePlugin;
  return newConfig;
};
