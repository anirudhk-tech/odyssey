const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("odysseyAPI", {
  createBookFolder: (bookName) =>
    ipcRenderer.invoke("createBookFolder", bookName),
  createScene: (bookName, sceneName) =>
    ipcRenderer.invoke("createScene", bookName, sceneName),
  getBooks: () => ipcRenderer.invoke("getBooks"),
});
