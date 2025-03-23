import { ipcMain } from "electron";
import { createScene } from "./services/scenesServices.js";
import { createBook, getBooks } from "./services/bookServices.js";

ipcMain.handle("createBookFolder", async (event, bookName) => {
  return createBook(bookName);
});

ipcMain.handle("createScene", async (event, bookName, sceneName) => {
  return createScene(bookName, sceneName);
});

ipcMain.handle("getBooks", async (event) => {
  return getBooks();
});
