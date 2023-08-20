// pluginManager.js

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  addPlugin(plugin) {
    this.plugins.push(plugin);
  }

  getPlugins() {
    return this.plugins;
  }

  resetPlugins() {
    this.plugins = [];
  }
}

const pluginManager = new PluginManager();
export default pluginManager;
