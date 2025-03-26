import { app } from "electron";
import fs from "fs";
import path from "path";
import { readGlobalMetaData, writeGlobalMetaData } from "./utilServices.js";

export const createBook = (bookName) => {
  try {
    const documentsPath = app.getPath("documents");
    const odysseyPath = path.join(documentsPath, "Odyssey");

    if (!fs.existsSync(odysseyPath)) {
      fs.mkdirSync(odysseyPath, { recursive: true });
    }

    const bookFolder = path.join(odysseyPath, bookName);
    const bookUUID = crypto.randomUUID();

    if (!fs.existsSync(bookFolder)) {
      fs.mkdirSync(bookFolder, { recursive: true });
    }

    const scenesDataPath = path.join(bookFolder, "scenes.json");
    if (!fs.existsSync(scenesDataPath)) {
      const initialData = { scenes: [] };
      fs.writeFileSync(
        scenesDataPath,
        JSON.stringify(initialData, null, 2),
        "utf8"
      );
    }

    const metaData = readGlobalMetaData();
    metaData.books.push({
      title: bookName,
      id: bookUUID,
      folder_path: bookFolder,
    });
    writeGlobalMetaData(metaData);

    return {
      success: true,
      message: "Book folder created successfully",
      data: { id: bookUUID },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error creating book folder: ${error}`,
    };
  }
};

export const deleteBook = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookIndex = metaData.books.findIndex((book) => book.id === bookUUID);
    if (bookIndex === -1) {
      return { success: false, message: "Book not found" };
    }
    const bookFolder = metaData.books[bookIndex].folder_path;

    fs.rmSync(bookFolder, { recursive: true, force: true });

    metaData.books.splice(bookIndex, 1);
    writeGlobalMetaData(metaData);

    return { success: true, message: "Book deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting book: ${error}` };
  }
};

export const renameBook = (bookUUID, newBookName) => {
  try {
    const metaData = readGlobalMetaData();

    if (metaData.books.some((book) => book.title === newBookName)) {
      return { success: false, message: "Book name already exists" };
    }

    const book = metaData.books.find((book) => book.id === bookUUID);
    if (!book) {
      return { success: false, message: "Book not found" };
    }

    const oldFolderPath = book.folder_path;
    const newFolderPath = path.join(path.dirname(oldFolderPath), newBookName);

    if (!fs.existsSync(oldFolderPath)) {
      return { success: false, message: "Original book folder not found" };
    }

    fs.renameSync(oldFolderPath, newFolderPath);

    book.title = newBookName;
    book.folder_path = newFolderPath;
    writeGlobalMetaData(metaData);

    return { success: true, message: "Book renamed successfully" };
  } catch (error) {
    return { success: false, message: `Error renaming book: ${error}` };
  }
};

export const getBooks = () => {
  try {
    const metaData = readGlobalMetaData();
    return { success: true, data: { books: metaData.books } };
  } catch (error) {
    return { success: false, message: `Error getting books: ${error}` };
  }
};
