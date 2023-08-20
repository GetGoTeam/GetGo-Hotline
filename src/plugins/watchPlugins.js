// const chokidar = require("chokidar");
// const path = require("path");
// const pluginDirectory = "./";

// async function importClassFromFile(filePath) {
//   try {
//     const module = await import(filePath);
//     return module.default;
//   } catch (error) {
//     console.error("Error importing class:", error);
//     return null;
//   }
// }

// chokidar.watch(pluginDirectory).on("add", async (filePath) => {
//   if (path.extname(filePath) && filePath !== "index.js" && filePath !== "watchPlugins.js") {
//     // console.log(`File ${filePath} has been added`);
//     const pluginImportedClass = await importClassFromFile("./" + filePath);
//     const microkernelImportedClass = await importClassFromFile("./index.js");

//     if (pluginImportedClass) {
//       const plugin = new pluginImportedClass();
//       const microkernel = new microkernelImportedClass();
//       // console.log(plugin.name());
//       // microkernel.registerPlugin(plugin.name(), plugin);
//       console.log(global.Microkernel);
//     }
//   }
// });
