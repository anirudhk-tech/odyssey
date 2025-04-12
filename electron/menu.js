import { app, Menu } from "electron";

const template = [];

export const setMenu = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
