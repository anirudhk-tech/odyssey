import { readGlobalMetaData, sluggifyText } from "./utilServices.js";
import fs from "fs";
import path from "path";

export const createTimeline = (bookUUID, timelineName) => {
  try {
    const timelineUUID = crypto.randomUUID();
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    if (
      data.timelines.some(
        (timeline) =>
          sluggifyText(timeline.title) === sluggifyText(timelineName)
      )
    ) {
      return {
        success: false,
        message: "Timeline already exists",
      };
    }

    data["sections"] = [];
    data.timelines.push({
      title: timelineName,
      id: timelineUUID,
      scenes: [],
    });

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return {
      success: true,
      message: "Timeline created successfully",
      data: { id: timelineUUID, title: timelineName, scenes: [] },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error creating timeline: ${error}`,
    };
  }
};

export const getTimelines = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    if (!fs.existsSync(timelinePath)) {
      const initialData = { timelines: [] };
      fs.writeFileSync(
        timelinePath,
        JSON.stringify(initialData, null, 2),
        "utf8"
      );
    }

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    return { success: true, data: { timelines: data.timelines } };
  } catch (error) {
    return {
      success: false,
      message: `Error getting timelines: ${error}. Book Path: ${book}`,
    };
  }
};

export const deleteTimeline = (bookUUID, timelineUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const timelineIndex = data.timelines.findIndex(
      (timeline) => timeline.id === timelineUUID
    );

    if (timelineIndex === -1) {
      return { success: false, message: "Timeline not found" };
    }

    data.timelines.splice(timelineIndex, 1);
    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Timeline deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting timeline: ${error}` };
  }
};

export const renameTimeline = (bookUUID, timelineUUID, newTitle) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    if (
      data.timelines.some(
        (timeline) => sluggifyText(timeline.title) === sluggifyText(newTitle)
      )
    ) {
      return {
        success: false,
        message: "Timeline already exists",
      };
    }

    const timelineIndex = data.timelines.findIndex(
      (timeline) => timeline.id === timelineUUID
    );

    if (timelineIndex === -1) {
      return { success: false, message: "Timeline not found" };
    }

    data.timelines[timelineIndex].title = newTitle;
    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Timeline renamed successfully" };
  } catch (error) {
    return { success: false, message: `Error renaming timeline: ${error}` };
  }
};

export const addSceneToTimeline = (bookUUID, timelineUUID, sceneUUID, x) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const timelineIndex = data.timelines.findIndex(
      (timeline) => timeline.id === timelineUUID
    );

    if (timelineIndex === -1) {
      return { success: false, message: "Timeline not found" };
    }

    data.timelines[timelineIndex].scenes.push({
      id: sceneUUID,
      x: x,
    });
    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Scene added to timeline successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error adding scene to timeline: ${error}`,
    };
  }
};
