import fs from "fs";
import path from "path";
import { countText, sluggifyText } from "./utilServices.js";
import { readGlobalMetaData } from "./utilServices.js";

export const createScene = (bookUUID, sceneName) => {
  try {
    const sceneUUID = crypto.randomUUID();
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));

    let untitledKey = 0;
    let adjustedSceneName = sceneName;

    if (sceneName === "Untitled") {
      for (let scene of data.scenes) {
        if (scene.title.includes("Untitled")) {
          untitledKey += 1;
        }
      }
    }

    let textFilePath = "";

    if (untitledKey > 0) {
      textFilePath = path.join(
        bookPath,
        sluggifyText(sceneName) + "(" + untitledKey + ")" + ".json"
      );
      adjustedSceneName = sceneName + "(" + untitledKey + ")";
    } else {
      textFilePath = path.join(bookPath, sluggifyText(sceneName) + ".json");
    }

    if (
      data.scenes.some(
        (scene) => sluggifyText(scene.title) === sluggifyText(adjustedSceneName)
      )
    ) {
      return {
        success: false,
        message: "Scene name already exists",
      };
    }

    data.scenes.push({
      title: adjustedSceneName,
      id: sceneUUID,
      textFilePath: textFilePath,
      color: null,
      x: null,
      wordCount: 0,
      charCount: 0,
    });

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");
    fs.writeFileSync(
      textFilePath,
      JSON.stringify({
        blocks: [],
        entityMap: {},
      }),
      "utf8"
    );

    return {
      success: true,
      message: "Scene created successfully",
      data: {
        id: sceneUUID,
        textFilePath: textFilePath,
        title: adjustedSceneName,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error creating scene: ${error}`,
    };
  }
};

export const deleteScene = (bookUUID, sceneUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const timelineData = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    const sceneIndex = data.scenes.findIndex((scene) => scene.id === sceneUUID);

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found" };
    }

    const textFilePath = data.scenes[sceneIndex].textFilePath;

    fs.rmSync(textFilePath, { force: true });

    data.scenes.splice(sceneIndex, 1);

    timelineData.timelines.forEach((timeline) => {
      timeline.scenes = timeline.scenes.filter(
        (scene) => scene.id !== sceneUUID
      );
    });

    timelineData.narrative.scenes = timelineData.narrative.scenes.filter(
      (scene) => scene.id !== sceneUUID
    );

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");
    fs.writeFileSync(
      timelinePath,
      JSON.stringify(timelineData, null, 2),
      "utf8"
    );

    return { success: true, message: "Scene deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting scene: ${error}` };
  }
};

export const renameScene = (bookUUID, sceneUUID, newSceneName) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const sceneIndex = data.scenes.findIndex((scene) => scene.id === sceneUUID);

    if (
      data.scenes.some(
        (scene) => sluggifyText(scene.title) === sluggifyText(newSceneName)
      )
    ) {
      return { success: false, message: "Scene name already exists" };
    }

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found" };
    }

    fs.renameSync(
      data.scenes[sceneIndex].textFilePath,
      path.join(bookPath, sluggifyText(newSceneName) + ".json")
    );

    data.scenes[sceneIndex].title = newSceneName;
    data.scenes[sceneIndex].textFilePath = path.join(
      bookPath,
      sluggifyText(newSceneName) + ".json"
    );

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Scene renamed successfully" };
  } catch (error) {
    return { success: false, message: `Error renaming scene: ${error}` };
  }
};

export const getScenes = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");

    if (!fs.existsSync(scenesPath)) {
      const initialData = { scenes: [] };
      fs.writeFileSync(
        scenesPath,
        JSON.stringify(initialData, null, 2),
        "utf8"
      );
    }

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));

    return { success: true, data: { scenes: data.scenes } };
  } catch (error) {
    return { success: false, message: `Error getting scenes: ${error}` };
  }
};

export const writeTextIntoScene = (bookUUID, sceneUUID, raw_json_text) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const timelineData = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const sceneIndex = data.scenes.findIndex((scene) => scene.id === sceneUUID);

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found" };
    }

    const textFilePath = data.scenes[sceneIndex].textFilePath;
    const { charCount, wordCount } = countText(raw_json_text);

    data.scenes[sceneIndex]["wordCount"] = wordCount;
    data.scenes[sceneIndex]["charCount"] = charCount;
    timelineData.timelines.forEach((timeline) => {
      timeline.scenes.forEach((scene) => {
        if (scene.id === sceneUUID) {
          scene.wordCount = wordCount;
          scene.charCount = charCount;
        }
      });
    });
    timelineData.narrative.scenes.forEach((scene) => {
      if (scene.id === sceneUUID) {
        scene.wordCount = wordCount;
        scene.charCount = charCount;
      }
    });

    fs.writeFileSync(textFilePath, raw_json_text, "utf8");
    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");
    fs.writeFileSync(
      timelinePath,
      JSON.stringify(timelineData, null, 2),
      "utf8"
    );

    return {
      success: true,
      message: "Scene updated successfully",
      data: { charCount, wordCount },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error updating scene: ${error}`,
    };
  }
};

export const getTextFromScene = (bookUUID, sceneUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const sceneIndex = data.scenes.findIndex((scene) => scene.id === sceneUUID);

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found" };
    }

    const textFilePath = data.scenes[sceneIndex].textFilePath;

    if (!fs.existsSync(textFilePath)) {
      return { success: false, message: "Scene not found" };
    }

    const raw_json_text = fs.readFileSync(textFilePath, "utf8");

    return { success: true, data: { raw_json_text } };
  } catch (error) {
    return { success: false, message: `Error getting scene: ${error}` };
  }
};
