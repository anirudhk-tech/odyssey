import { readGlobalMetaData, writeGlobalMetaData } from "./utilServices.js";

export const getPreferences = () => {
  const metaData = readGlobalMetaData();

  if (!metaData.preferences) {
    metaData["preferences"] = {
      showWordCount: true,
      fillSceneBoxesColor: true,
    };
  }

  writeGlobalMetaData(metaData);

  return {
    success: true,
    message: "Preferences retrieved successfully",
    data: metaData.preferences,
  };
};

export const toggleFillSceneBoxesColorPreference = (_, win) => {
  const metaData = readGlobalMetaData();

  metaData["preferences"].fillSceneBoxesColor
    ? (metaData["preferences"].fillSceneBoxesColor = false)
    : (metaData["preferences"].fillSceneBoxesColor = true);

  writeGlobalMetaData(metaData);

  win.webContents.send("preference-changed", {
    key: "fillSceneBoxesColor",
    value: metaData["preferences"].fillSceneBoxesColor,
  });

  return {
    success: true,
    message: "Preferences updated successfully",
    data: metaData.preferences,
  };
};

export const toggleShowWordCountPreference = (_, win) => {
  const metaData = readGlobalMetaData();

  metaData["preferences"].showWordCount
    ? (metaData["preferences"].showWordCount = false)
    : (metaData["preferences"].showWordCount = true);

  writeGlobalMetaData(metaData);

  win.webContents.send("preference-changed", {
    key: "showWordCount",
    value: metaData["preferences"].showWordCount,
  });

  return {
    success: true,
    message: "Preferences updated successfully",
    data: metaData.preferences,
  };
};

export const toggleShowCharCountPreference = (_, win) => {
  const metaData = readGlobalMetaData();

  metaData["preferences"].showCharCount
    ? (metaData["preferences"].showCharCount = false)
    : (metaData["preferences"].showCharCount = true);

  writeGlobalMetaData(metaData);

  win.webContents.send("preference-changed", {
    key: "showCharCount",
    value: metaData["preferences"].showCharCount,
  });

  return {
    success: true,
    message: "Preferences updated successfully",
    data: metaData.preferences,
  };
};
