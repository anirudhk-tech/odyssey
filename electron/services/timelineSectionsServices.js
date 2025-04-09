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
    const section = {
      id: sectionUUID,
      title: sectionName,
      color: sectionColor,
      xStart: xStart,
      xEnd: xStart + 100,
      width: 100,
    };

    if (data.sections.some((section) => section.title === sectionName)) {
      return {
        success: false,
        message: "Section already exists",
      };
    }

    data.sections.push(section);

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return {
      success: true,
      message: "Section added to timeline successfully",
      data: { section: section },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error adding section to timeline: ${error}`,
    };
  }
};

export const resizeTimelineSection = (
  bookUUID,
  sectionUUID,
  xStart,
  xEnd,
  width
) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const scenesData = JSON.parse(fs.readFileSync(scenesPath, "utf8"));

    const sectionIndex = data.sections.findIndex(
      (section) => section.id === sectionUUID
    );

    if (sectionIndex === -1) {
      return { success: false, message: "Section not found" };
    }

    const initialXStart = data.sections[sectionIndex].xStart;
    const initialXEnd = data.sections[sectionIndex].xEnd;
    const changedScenes = [];

    data.sections[sectionIndex].xStart = xStart;
    data.sections[sectionIndex].xEnd = xEnd;
    data.sections[sectionIndex].width = width;

    const affectedXStart = Math.min(initialXStart, xStart);
    const affectedXEnd = Math.max(initialXEnd, xEnd);

    data.narrative.scenes.forEach((scene) => {
      if (scene.x >= affectedXStart && scene.x <= affectedXEnd) {
        const newSection = data.sections.find(
          (section) => section.xStart <= scene.x && section.xEnd >= scene.x
        );
        if (newSection) {
          scene.color = newSection.color;
        } else {
          scene.color = null;
        }
        changedScenes.push(scene);
      }
    });

    changedScenes.forEach((newScene) => {
      const scene = scenesData.scenes.find((s) => s.id === newScene.id);
      if (scene) {
        scene.color = newScene.color;
      }
    });

    data.timelines.forEach((timeline) => {
      timeline.scenes.forEach((scene) => {
        const newScene = changedScenes.find((s) => s.id === scene.id);

        if (newScene) {
          scene.color = newScene.color;
        }
      });
    });

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
    fs.writeFileSync(scenesPath, JSON.stringify(scenesData, null, 2), "utf8");

    return {
      success: true,
      message: "Section resized successfully",
      data: { changedScenes: changedScenes },
    };
  } catch (error) {
    return { success: false, message: `Error resizing section: ${error}` };
  }
};

export const editTimelineSection = (
  bookUUID,
  sectionUUID,
  sectionName,
  sectionColor
) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    const sectionIndex = data.sections.findIndex(
      (section) => section.id === sectionUUID
    );

    if (sectionIndex === -1) {
      return { success: false, message: "Section not found" };
    }

    data.sections[sectionIndex].title = sectionName;
    data.sections[sectionIndex].color = sectionColor;

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Section edited successfully" };
  } catch (error) {
    return { success: false, message: `Error editing section: ${error}` };
  }
};

export const deleteTimelineSection = (bookUUID, sectionUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const sectionIndex = data.sections.findIndex(
      (section) => section.id === sectionUUID
    );

    if (sectionIndex === -1) {
      return { success: false, message: "Section not found" };
    }

    const widthReduce = data.sections[sectionIndex].width;

    data.sections.forEach((section, idx) => {
      if (idx > sectionIndex) {
        section.xStart -= widthReduce;
        section.xEnd -= widthReduce;
      }
    });

    data.sections = data.sections.filter(
      (section) => section.id !== sectionUUID
    );

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Section deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting section: ${error}` };
  }
};

export const swapTimelineSections = (bookUUID, sectionUUID1, sectionUUID2) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");
    const scenesPath = path.join(bookPath, "scenes.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const scenesData = JSON.parse(fs.readFileSync(scenesPath, "utf8"));

    const sectionIndex1 = data.sections.findIndex(
      (section) => section.id === sectionUUID1
    );
    const sectionIndex2 = data.sections.findIndex(
      (section) => section.id === sectionUUID2
    );

    if (sectionIndex1 === -1 || sectionIndex2 === -1) {
      return { success: false, message: "Section not found" };
    }

    const tempXStart = data.sections[sectionIndex1].xStart;
    const tempXEnd = data.sections[sectionIndex1].xEnd;

    const sectionOneColor = data.sections[sectionIndex1].color;
    const sectionTwoColor = data.sections[sectionIndex2].color;

    data.sections[sectionIndex1].xStart = data.sections[sectionIndex2].xStart;
    data.sections[sectionIndex1].xEnd = data.sections[sectionIndex2].xEnd;

    data.sections[sectionIndex2].xStart = tempXStart;
    data.sections[sectionIndex2].xEnd = tempXEnd;

    data.timelines.map((timeline) => {
      timeline.scenes.map((scene) => {
        if (scene.color === sectionOneColor) {
          scene.color = sectionTwoColor;
        } else if (scene.color === sectionTwoColor) {
          scene.color = sectionOneColor;
        }
      });
    });

    data.narrative.scenes.map((scene) => {
      if (scene.color === sectionOneColor) {
        scene.color = sectionTwoColor;
      } else if (scene.color === sectionTwoColor) {
        scene.color = sectionOneColor;
      }
    });

    scenesData.scenes.map((scene) => {
      if (scene.color === sectionOneColor) {
        scene.color = sectionTwoColor;
      } else if (scene.color === sectionTwoColor) {
        scene.color = sectionOneColor;
      }
    });

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
    fs.writeFileSync(scenesPath, JSON.stringify(scenesData, null, 2), "utf8");

    return {
      success: true,
      message: "Sections swapped successfully",
      data: { colorOne: sectionOneColor, colorTwo: sectionTwoColor },
    };
  } catch (error) {
    return { success: false, message: `Error swapping sections: ${error}` };
  }
};
