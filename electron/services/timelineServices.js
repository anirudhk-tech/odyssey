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
      const initialData = {
        timelines: [],
        sections: [],
        narrative: { scenes: [] },
      };
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
      message: `Error getting timelines: ${error}.`,
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
    const scenesPath = path.join(bookPath, "scenes.json");

    const scenesData = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    const timelineIndex = data.timelines.findIndex(
      (timeline) => timeline.id === timelineUUID
    );

    if (timelineIndex === -1) {
      return {
        success: false,
        message: "Timeline not found",
      };
    }

    const sceneIndex = data.timelines[timelineIndex].scenes.findIndex(
      (scene) => scene.id === sceneUUID
    );

    if (sceneIndex === -1) {
      const scene = scenesData.scenes.find((scene) => scene.id === sceneUUID);
      scene["x"] = x;

      data.timelines[timelineIndex].scenes.push(scene);

      fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
      return {
        success: true,
        message: "Scene added to timeline successfully",
        data: { exists: false, scene: scene },
      };
    } else {
      const scene = data.timelines[timelineIndex].scenes[sceneIndex];
      scene.x = x;

      fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
      return {
        success: true,
        message: "Scene added to timeline successfully",
        data: { exists: true, scene: scene },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error adding scene to timeline: ${error}`,
    };
  }
};

export const deleteSceneFromTimeline = (bookUUID, timelineUUID, sceneUUID) => {
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

    const sceneIndex = data.timelines[timelineIndex].scenes.findIndex(
      (scene) => scene.id === sceneUUID
    );

    if (sceneIndex === -1) {
      return { success: false, message: "Scene not found in timeline" };
    }

    data.timelines[timelineIndex].scenes.splice(sceneIndex, 1);
    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");

    return {
      success: true,
      message: "Scene deleted from timeline successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error deleting scene from timeline: ${error}`,
    };
  }
};

export const getNarrativeTimeline = (bookUUID) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    if (!fs.existsSync(timelinePath)) {
      return { success: false, message: "Timeline not found" };
    }

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    return {
      success: true,
      data: { narrativeTimeline: data.narrative },
    };
  } catch (error) {
    return {
      success: false,
      message: `Error getting narrative timeline: ${error}`,
    };
  }
};

export const addSceneToNarrativeTimeline = (bookUUID, sceneUUID, x) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");
    const scenesPath = path.join(bookPath, "scenes.json");

    const scenesData = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
    const sections = data.sections || [];

    const sceneIndex = data.narrative.scenes.findIndex(
      (scene) => scene.id === sceneUUID
    );

    if (sceneIndex === -1) {
      const scene = scenesData.scenes.find((scene) => scene.id === sceneUUID);
      scene.x = x;

      const color =
        sections.find((section) => x >= section.xStart && x <= section.xEnd)
          ?.color ?? "#000000";
      scene.color = color;

      data.narrative.scenes.push(scene);

      data.timelines.forEach((timeline) => {
        const sceneIndex = timeline.scenes.findIndex(
          (scene) => scene.id === sceneUUID
        );
        if (sceneIndex !== -1) {
          timeline.scenes[sceneIndex].color = color;
        }
      });

      fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
      fs.writeFileSync(scenesPath, JSON.stringify(scenesData, null, 2), "utf8");
      return {
        success: true,
        message: "Scene added to narrative successfully",
        data: { exists: false, scene: scene },
      };
    } else {
      const scene = data.narrative.scenes[sceneIndex];
      const scenesDataScene = scenesData.scenes.find(
        (scene) => scene.id === sceneUUID
      );

      scene.x = x;
      scenesDataScene.x = x;

      const color =
        sections.find((section) => x >= section.xStart && x <= section.xEnd)
          ?.color ?? "#000000";

      scene.color = color;
      scenesDataScene.color = color;

      data.timelines.forEach((timeline) => {
        const sceneIndex = timeline.scenes.findIndex(
          (scene) => scene.id === sceneUUID
        );
        if (sceneIndex !== -1) {
          timeline.scenes[sceneIndex].color = color;
        }
      });

      fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
      fs.writeFileSync(scenesPath, JSON.stringify(scenesData, null, 2), "utf8");
      return {
        success: true,
        message: "Scene added to narrative successfully",
        data: { exists: true, scene: scene },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error adding scene to narrative: ${error}`,
    };
  }
};

export const renameTimelinesSceneName = (bookUUID, sceneUUID, newTitle) => {
  try {
    const metaData = readGlobalMetaData();
    const bookPath = metaData.books.find(
      (book) => book.id === bookUUID
    ).bookFolderPath;
    const timelinePath = path.join(bookPath, "timeline.json");

    const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

    data.timelines.forEach((timeline) => {
      const sceneIndex = timeline.scenes.findIndex(
        (scene) => scene.id === sceneUUID
      );

      if (sceneIndex !== -1) {
        timeline.scenes[sceneIndex].title = newTitle;
      }
    });

    const narrativeSceneIndex = data.narrative.scenes.findIndex(
      (scene) => scene.id === sceneUUID
    );
    if (narrativeSceneIndex !== -1) {
      data.narrative.scenes[narrativeSceneIndex].title = newTitle;
    }

    fs.writeFileSync(timelinePath, JSON.stringify(data, null, 2), "utf8");
    return {
      success: true,
      message: "Scene renamed successfully in timelines",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error renaming scene in timelines: ${error}`,
    };
  }
};
