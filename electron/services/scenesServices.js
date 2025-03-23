import fs from "fs";
import path from "path";

export const createScene = (bookFolder, sceneName) => {
  try {
    const scenesPath = path.join(bookFolder, "scenes.json");
    const data = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
    data.scenes.push({ title: sceneName });

    fs.writeFileSync(scenesPath, JSON.stringify(data, null, 2), "utf8");

    return { success: true, message: "Scene created successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error creating scene: ${error}`,
    };
  }
};
