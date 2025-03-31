import { readGlobalMetaData } from "./utilServices.js";
import fs from "fs";
import path from "path";

export const createTimeline = (bookUUID, timelineName) => {
  try {
    const timelineUUID = crypto.randomUUID();
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).book_folder_path;
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

    data.timelines.push({
      title: timelineName,
      id: timelineUUID,
      scenes: [],
    });

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return {
      success: true,
      message: "Timeline created successfully",
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
      (book) => book.uuid === bookUUID
    ).book_folder_path;
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
    return { success: false, message: `Error getting timelines: ${error}` };
  }
};
