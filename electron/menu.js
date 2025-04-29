import { Menu } from "electron";
import {
  getPreferences,
  toggleFillSceneBoxesColorPreference,
  toggleShowCharCountPreference,
  toggleShowWordCountPreference,
} from "./services/preferenceServices.js";

const buildTemplate = (preferences) => {
  const template = [
    {
      label: "Appearance",
      submenu: [
        {
          label: "Show Word Count",
          type: "checkbox",
          checked: preferences.showWordCount,
          click: toggleShowWordCountPreference,
        },
        {
          label: "Show Character Count",
          type: "checkbox",
          checked: preferences.showCharCount,
          click: toggleShowCharCountPreference,
        },
        {
          label: "Fill Scene Boxes Color",
          type: "checkbox",
          checked: preferences.fillSceneBoxesColor,
          click: toggleFillSceneBoxesColorPreference,
        },
      ],
    },
  ];

  return template;
};

export const setMenu = () => {
  const dev = process.env.DEV_MODE;
  const preferences = getPreferences().data;

  let template = buildTemplate(preferences);

  if (dev) {
    template = [{ role: "viewMenu" }, ...template];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
