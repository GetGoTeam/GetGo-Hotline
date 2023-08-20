class Microkernel {
  constructor() {
    this.plugins = {};
  }

  registerPlugin(name, plugin) {
    this.plugins[name] = plugin;
  }

  locateAddress = async (address, plugin) => {
    const selectedPlugin = this.plugins[plugin];
    if (selectedPlugin) {
      return selectedPlugin.locateAddress(address);
    }
    console.error("Couldn't found plugin " + plugin);
    return null;
  };

  name = () => {
    return "Microkernel";
  };
}

module.exports = Microkernel;
