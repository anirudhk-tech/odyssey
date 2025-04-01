import fs from "fs";
import path from "path";
import { readGlobalMetaData } from "./utilServices.js";

export const getTimelineSections = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    if (!fs.existsSync(timelinePath)) {
      const initialData = { sections: [] };
      fs.writeFileSync(
        timelinePath,
        JSON.stringify(initialData, null, 2),
        "utf8"
      );
    }

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    return { success: true, data: { sections: data.sections } };
  } catch (error) {
    return { success: false, message: `Error getting sections: ${error}` };
  }
};

export const createTimelineSection = (
  bookUUID,
  sectionName,
  sectionColor,
  xStart
) => {
  try {
    const sectionUUID = crypto.randomUUID();
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    data.sections.push({
      id: sectionUUID,
      title: sectionName,
      color: sectionColor,
      xStart: xStart,
      xEnd: xStart + 100,
      width: 100,
    });

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Section added to timeline successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error adding section to timeline: ${error}`,
    };
  }
};

export const resizeSection = (bookUUID, sectionId, xStart, xEnd) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    const sectionIndex = data.sections.findIndex(
      (section) => section.id === sectionId
    );

    if (sectionIndex === -1) {
      return { success: false, message: "Section not found" };
    }

    data.sections[sectionIndex].xStart = xStart;
    data.sections[sectionIndex].xEnd = xEnd;

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Section resized successfully" };
  } catch (error) {
    return { success: false, message: `Error resizing section: ${error}` };
  }
};
