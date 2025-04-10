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
  resizeTimelineSection: (bookUUID, sectionUUID, xStart, xEnd, width) =>
    ipcRenderer.invoke(
      "resizeTimelineSection",
      bookUUID,
      sectionUUID,
      xStart,
      xEnd,
      width
    ),

  editTimelineSection: (bookUUID, sectionUUID, sectionName, sectionColor) =>
    ipcRenderer.invoke(
      "editTimelineSection",
      bookUUID,
      sectionUUID,
      sectionName,
      sectionColor
    ),

  deleteTimelineSection: (bookUUID, sectionUUID) =>
    ipcRenderer.invoke("deleteTimelineSection", bookUUID, sectionUUID),

  swapTimelineSections: (bookUUID, sectionUUID1, sectionUUID2) =>
    ipcRenderer.invoke(
      "swapTimelineSections",
      bookUUID,
      sectionUUID1,
      sectionUUID2
    ),
  addSceneToTimeline: (bookUUID, sceneUUID, timelineUUID, x) =>
    ipcRenderer.invoke(
      "addSceneToTimeline",
      bookUUID,
      sceneUUID,
      timelineUUID,
      x
    ),
  deleteSceneFromTimeline: (bookUUID, sceneUUID, timelineUUID) =>
    ipcRenderer.invoke(
      "deleteSceneFromTimeline",
      bookUUID,
      sceneUUID,
      timelineUUID
    ),
  deleteSceneFromAllTimelines: (bookUUID, sceneUUID) =>
    ipcRenderer.invoke("deleteSceneFromAllTimelines", bookUUID, sceneUUID),
  getNarrativeTimeline: (bookUUID) =>
    ipcRenderer.invoke("getNarrativeTimeline", bookUUID),
  addSceneToNarrativeTimeline: (bookUUID, sceneUUID, x) =>
    ipcRenderer.invoke("addSceneToNarrativeTimeline", bookUUID, sceneUUID, x),
  deleteSceneFromNarrativeTimeline: (bookUUID, sceneUUID) =>
    ipcRenderer.invoke("deleteSceneFromNarrativeTimeline", bookUUID, sceneUUID),
  renameTimelinesSceneName: (bookUUID, sceneUUID, newSceneName) =>
    ipcRenderer.invoke(
      "renameTimelinesSceneName",
      bookUUID,
      sceneUUID,
      newSceneName
    ),
  moveSceneOnNarrativeTimeline: (bookUUID, sceneUUID, x) =>
    ipcRenderer.invoke("moveSceneOnNarrativeTimeline", bookUUID, sceneUUID, x),
  moveSceneOnTimeline: (bookUUID, timelineUUID, sceneUUID, x) =>
    ipcRenderer.invoke(
      "moveSceneOnTimeline",
      bookUUID,
      timelineUUID,
      sceneUUID,
      x
    ),
});
