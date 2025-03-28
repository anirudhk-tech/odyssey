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
  deleteScene: (bookUUID, sceneUUID) =>
    ipcRenderer.invoke("deleteScene", bookUUID, sceneUUID),
  renameScene: (bookUUID, sceneUUID, newSceneName) =>
    ipcRenderer.invoke("renameScene", bookUUID, sceneUUID, newSceneName),
  getTextFromScene: (bookUUID, sceneUUID) =>
    ipcRenderer.invoke("getTextFromScene", bookUUID, sceneUUID),
  writeTextIntoScene: (bookUUID, sceneUUID, raw_json_text) =>
    ipcRenderer.invoke(
      "writeTextIntoScene",
      bookUUID,
      sceneUUID,
      raw_json_text
    ),
  closeWindow: () => ipcRenderer.invoke("closeWindow"),
});
