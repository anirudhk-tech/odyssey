import { app } from "electron";
import fs from "fs";
import path from "path";

export const createBook = (bookName) => {
  try {
    const documentsPath = app.getPath("documents");
    const bookFolder = path.join(documentsPath, "Odyssey", bookName);
    const bookUUID = crypto.randomUUID();

    if (!fs.existsSync(bookFolder)) {
      fs.mkdirSync(bookFolder, { recursive: true });
    }

    const metaDataPath = path.join(bookFolder, "metadata.json");

    if (!fs.existsSync(metaDataPath)) {
      const initialData = { id: bookUUID, scenes: [] };
      fs.writeFileSync(
        metaDataPath,
        JSON.stringify(initialData, null, 2),
        "utf8"
      );
    }

    return {
      success: true,
      message: "Book folder created successfully",
      data: { uuid: bookUUID },
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
    const documentsPath = app.getPath("documents");
    const booksPath = path.join(documentsPath, "Odyssey");
    const bookFolders = fs.readdirSync(booksPath);

    bookFolders.map((folder) => {
      const metaDataPath = path.join(booksPath, folder, "metadata.json");
      const metaData = JSON.parse(fs.readFileSync(metaDataPath, "utf8"));

      if (metaData.id === bookUUID) {
        fs.rmdirSync(path.join(booksPath, folder), { recursive: true });
      }
    });

    return { success: true, message: "Book deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting book: ${error}` };
  }
};

export const getBooks = () => {
  try {
    const documentsPath = app.getPath("documents");
    const booksPath = path.join(documentsPath, "Odyssey");

    if (!fs.existsSync(booksPath)) {
      fs.mkdirSync(booksPath, { recursive: true });
    }

    const bookFolders = fs.readdirSync(booksPath);

    const books = bookFolders.map((folder) => {
      const metaDataPath = path.join(booksPath, folder, "metadata.json");
      const metaData = JSON.parse(fs.readFileSync(metaDataPath, "utf8"));
      return { title: folder, uuid: metaData.id };
    });

    return { success: true, data: { books: books } };
  } catch (error) {
    return { success: false, message: `Error getting books: ${error}` };
  }
};
