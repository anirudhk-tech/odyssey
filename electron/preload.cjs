const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("odysseyAPI", {
  createBook: (bookName) => ipcRenderer.invoke("createBook", bookName),
  createScene: (bookName, sceneName) =>
    ipcRenderer.invoke("createScene", bookName, sceneName),
  getBooks: () => ipcRenderer.invoke("getBooks"),
  deleteBook: (bookUUID) => ipcRenderer.invoke("deleteBook", bookUUID),
  renameBook: (bookUUID, newBookName) =>
    ipcRenderer.invoke("renameBook", bookUUID, newBookName),
  getScenes: (bookUUID) => ipcRenderer.invoke("getScenes", bookUUID),
});
