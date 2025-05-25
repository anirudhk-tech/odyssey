import { app, Menu } from "electron";
import {
  getPreferences,
  toggleFillSceneBoxesColorPreference,
  toggleShowCharCountPreference,
  toggleShowWordCountPreference,
} from "./services/preferenceServices.js";
import { navigateToExport } from "./services/exportServices.js";

const buildTemplate = (preferences) => {
  const template = [
    {
      label: "Home",
      click: (_, win) => win.webContents.send("home-clicked"),
    },
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
    {
      label: "Export",
      submenu: [
        {
          label: "Export to PDF",
          click: navigateToExport,
        },
      ],
    },
  ];

  return template;
};

export const setMenu = () => {
  const dev = !app.isPackaged;
  const preferences = getPreferences().data;

  let template = buildTemplate(preferences);

  if (dev) {
    template = [{ role: "viewMenu" }, ...template];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
