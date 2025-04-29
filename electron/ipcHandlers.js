import { ipcMain } from "electron";
import {
  createScene,
  deleteScene,
  getScenes,
  getTextFromScene,
  renameScene,
  writeTextIntoScene,
} from "./services/scenesServices.js";
import {
  createBook,
  deleteBook,
  getBooks,
  renameBook,
} from "./services/bookServices.js";
import {
  createTimeline,
  deleteTimeline,
  getTimelines,
  renameTimeline,
  addSceneToTimeline,
  getNarrativeTimeline,
  deleteSceneFromTimeline,
  addSceneToNarrativeTimeline,
  renameTimelinesSceneName,
  moveSceneOnNarrativeTimeline,
  moveSceneOnTimeline,
  deleteSceneFromAllTimelines,
  deleteSceneFromNarrativeTimeline,
} from "./services/timelineServices.js";
import {
  createTimelineSection,
  deleteTimelineSection,
  editTimelineSection,
  getTimelineSections,
  resizeTimelineSection,
  swapTimelineSections,
} from "./services/timelineSectionsServices.js";
import { getPreferences } from "./services/preferenceServices.js";

ipcMain.handle("createBook", async (event, bookName) => {
  return createBook(bookName);
});

ipcMain.handle("createScene", async (event, bookName, sceneName) => {
  return createScene(bookName, sceneName);
});

ipcMain.handle("getBooks", async (event) => {
  return getBooks();
});

ipcMain.handle("deleteBook", async (event, bookUUID) => {
  return deleteBook(bookUUID);
});

ipcMain.handle("renameBook", async (event, bookUUID, newBookName) => {
  return renameBook(bookUUID, newBookName);
});

ipcMain.handle("getScenes", async (event, bookUUID) => {
  return getScenes(bookUUID);
});

ipcMain.handle("deleteScene", async (event, bookUUID, sceneUUID) => {
  return deleteScene(bookUUID, sceneUUID);
});

ipcMain.handle(
  "renameScene",
  async (event, bookUUID, sceneUUID, newSceneName) => {
    return renameScene(bookUUID, sceneUUID, newSceneName);
  }
);

ipcMain.handle(
  "writeTextIntoScene",
  async (event, bookUUID, sceneUUID, raw_json_text) => {
    return writeTextIntoScene(bookUUID, sceneUUID, raw_json_text);
  }
);

ipcMain.handle("getTextFromScene", async (event, bookUUID, sceneUUID) => {
  return getTextFromScene(bookUUID, sceneUUID);
});

ipcMain.handle("getTimelines", async (event, bookUUID) => {
  return getTimelines(bookUUID);
});

ipcMain.handle("createTimeline", async (event, bookUUID, timelineName) => {
  return createTimeline(bookUUID, timelineName);
});

ipcMain.handle("deleteTimeline", async (event, bookUUID, timelineUUID) => {
  return deleteTimeline(bookUUID, timelineUUID);
});

ipcMain.handle("renameTimeline", (event, bookUUID, timelineUUID, newTitle) => {
  return renameTimeline(bookUUID, timelineUUID, newTitle);
});

ipcMain.handle("getTimelineSections", async (event, bookUUID) => {
  return getTimelineSections(bookUUID);
});

ipcMain.handle(
  "createTimelineSection",
  async (event, bookUUID, sectionName, sectionColor, xStart) => {
    return createTimelineSection(bookUUID, sectionName, sectionColor, xStart);
  }
);

ipcMain.handle(
  "resizeTimelineSection",
  async (event, bookUUID, sectionUUID, xStart, xEnd, width) => {
    return resizeTimelineSection(bookUUID, sectionUUID, xStart, xEnd, width);
  }
);

ipcMain.handle(
  "editTimelineSection",
  async (event, bookUUID, sectionUUID, sectionName, sectionColor) => {
    return editTimelineSection(
      bookUUID,
      sectionUUID,
      sectionName,
      sectionColor
    );
  }
);

ipcMain.handle(
  "deleteTimelineSection",
  async (event, bookUUID, sectionUUID) => {
    return deleteTimelineSection(bookUUID, sectionUUID);
  }
);

ipcMain.handle(
  "swapTimelineSections",
  async (event, bookUUID, sectionUUID1, sectionUUID2) => {
    return swapTimelineSections(bookUUID, sectionUUID1, sectionUUID2);
  }
);

ipcMain.handle(
  "addSceneToTimeline",
  async (event, bookUUID, timelineUUID, sceneUUID, x) => {
    return addSceneToTimeline(bookUUID, timelineUUID, sceneUUID, x);
  }
);

ipcMain.handle(
  "deleteSceneFromTimeline",
  async (event, bookUUID, sceneUUID, timelineUUID) => {
    return deleteSceneFromTimeline(bookUUID, sceneUUID, timelineUUID);
  }
);

ipcMain.handle(
  "deleteSceneFromAllTimelines",
  async (event, bookUUID, sceneUUID) => {
    return deleteSceneFromAllTimelines(bookUUID, sceneUUID, null);
  }
);

ipcMain.handle("getNarrativeTimeline", async (event, bookUUID) => {
  return getNarrativeTimeline(bookUUID);
});

ipcMain.handle(
  "addSceneToNarrativeTimeline",
  async (event, bookUUID, sceneUUID, x) => {
    return addSceneToNarrativeTimeline(bookUUID, sceneUUID, x);
  }
);

ipcMain.handle(
  "deleteSceneFromNarrativeTimeline",
  async (event, bookUUID, sceneUUID) => {
    return deleteSceneFromNarrativeTimeline(bookUUID, sceneUUID, null);
  }
);

ipcMain.handle(
  "renameTimelinesSceneName",
  async (event, bookUUID, sceneUUID, newSceneName) => {
    return renameTimelinesSceneName(bookUUID, sceneUUID, newSceneName);
  }
);

ipcMain.handle(
  "moveSceneOnNarrativeTimeline",
  async (event, bookUUID, sceneUUID, x) => {
    return moveSceneOnNarrativeTimeline(bookUUID, sceneUUID, x);
  }
);

ipcMain.handle(
  "moveSceneOnTimeline",
  async (event, bookUUID, timelineUUID, sceneUUID, x) => {
    return moveSceneOnTimeline(bookUUID, timelineUUID, sceneUUID, x);
  }
);

ipcMain.handle("getPreferences", async (event) => {
  return getPreferences();
});
