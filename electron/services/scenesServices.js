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
    ).folder_path;
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    let untitledKey = 0;

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
    } else {
      textFilePath = path.join(bookPath, sluggifyText(sceneName) + ".txt");
    }

    data.scenes.push({
      title: sceneName,
      id: sceneUUID,
      text_file_path: textFilePath,
    });

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Scene created successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error creating scene: ${error}`,
    };
  }
};

export const getScenes = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).folder_path;
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
