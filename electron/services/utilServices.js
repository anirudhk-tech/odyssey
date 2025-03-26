import { app } from "electron";
import fs from "fs";
import path from "path";

export const sluggifyText = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getGlobalMetaDataPath = () => {
  const documentsPath = app.getPath("documents");
  return path.join(documentsPath, "Odyssey", "metadata.json");
};

export const readGlobalMetaData = () => {
  const metaDataPath = getGlobalMetaDataPath();
  if (!fs.existsSync(metaDataPath)) {
    const initialData = { books: [] };
    fs.writeFileSync(
      metaDataPath,
      JSON.stringify(initialData, null, 2),
      "utf8"
    );
  }
  return JSON.parse(fs.readFileSync(metaDataPath, "utf8"));
};

export const writeGlobalMetaData = (data) => {
  const metaDataPath = getGlobalMetaDataPath();
  fs.writeFileSync(metaDataPath, JSON.stringify(data, null, 2), "utf8");
};
