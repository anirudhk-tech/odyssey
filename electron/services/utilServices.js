import { app, dialog } from "electron";
import fs from "fs";
import path from "path";

export const countText = (raw_json_text) => {
  const rawContentObject = JSON.parse(raw_json_text);

  const blocks = Array.isArray(rawContentObject?.blocks)
    ? rawContentObject.blocks
    : [];
  const allText = blocks.map((b) => b.text).join(" ") ?? "";

  const charCount = allText.length;
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;

  return { charCount, wordCount };
};

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
  const dirPath = path.dirname(metaDataPath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

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

export const pickImage = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }],
  });
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
};
