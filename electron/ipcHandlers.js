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
