// addPluginAutomatically.js

const plugins = [];

// Tự động tìm và import tất cả các tệp plugin từ thư mục plugins
const pluginsContext = require.context("./plugin", false, /\.js$/);
pluginsContext.keys().forEach(modulePath => {
  const pluginModule = pluginsContext(modulePath);
  plugins.push(pluginModule.default);
});

export default plugins;
