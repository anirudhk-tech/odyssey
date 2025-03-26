import fs from "fs";
import path from "path";
import { sluggifyText } from "./utilServices.js";
import { readGlobalMetaData } from "./utilServices.js";

export const createScene = (bookUUID, sceneName) => {
  try {
    const sceneUUID = crypto.randomUUID();
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).book_folder_path;
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
        sluggifyText(sceneName) + "(" + untitledKey + ")" + ".txt"
      );
      adjustedSceneName = sceneName + "(" + untitledKey + ")";
    } else {
      textFilePath = path.join(bookPath, sluggifyText(sceneName) + ".txt");
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
      text_file_path: textFilePath,
    });

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");

    return {
      success: true,
      message: "Scene created successfully",
      data: {
        id: sceneUUID,
        text_file_path: textFilePath,
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
    ).book_folder_path;
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const sceneIndex = data.scenes.findIndex((scene) => scene.id === sceneUUID);

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found" };
    }

    const textFilePath = data.scenes[sceneIndex].text_file_path;

    fs.rmSync(textFilePath, { force: true });

    data.scenes.splice(sceneIndex, 1);
    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");

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
    ).book_folder_path;
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

    data.scenes[sceneIndex].title = newSceneName;
    data.scenes[sceneIndex].text_file_path = path.join(
      bookPath,
      sluggifyText(newSceneName) + ".txt"
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
    ).book_folder_path;
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
