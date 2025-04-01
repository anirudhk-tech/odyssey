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
  getTimelines: (bookUUID) => ipcRenderer.invoke("getTimelines", bookUUID),
  createTimeline: (bookUUID, timelineName) =>
    ipcRenderer.invoke("createTimeline", bookUUID, timelineName),
  deleteTimeline: (bookUUID, timelineUUID) =>
    ipcRenderer.invoke("deleteTimeline", bookUUID, timelineUUID),
  renameTimeline: (bookUUID, timelineUUID, newTitle) =>
    ipcRenderer.invoke("renameTimeline", bookUUID, timelineUUID, newTitle),
  getTimelineSections: (bookUUID) =>
    ipcRenderer.invoke("getTimelineSections", bookUUID),
  createTimelineSection: (bookUUID, sectionName, sectionColor, xStart) =>
    ipcRenderer.invoke(
      "createTimelineSection",
      bookUUID,
      sectionName,
      sectionColor,
      xStart
    ),
});
