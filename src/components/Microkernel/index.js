// import GoongPlugin from "~/src/plugins/GoongPlugin";
// import GoogleMapsPlugin from "~/src/plugins/GoogleMapsPlugin";

const Microkernel = () => {
  const plugins = {};

  class Microkernel {
    constructor() {
      // this.plugins = {};
      // this.registerPlugin("GoongPlugin", new GoongPlugin());
      throw new Error("Cannot instantiate a static class.");
    }

    registerPlugin(name, plugin) {
      plugins[name] = plugin;
    }

    locateAddress = async (address, plugin) => {
      const selectedPlugin = plugins[plugin];
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
  return Microkernel;
};

global.Microkernel = Microkernel;
