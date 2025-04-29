import path from "path";
import { Tray, Menu } from "electron";

export const setTray = (mainWindow) => {
  const tray = new Tray(path.join(__dirname, "assets", "logo.png"));
  tray.setToolTip("Odyssey");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Show Odyssey", click: () => mainWindow.show() },
      { type: "separator" },
      { role: "quit", label: "Quit Odyssey" },
    ])
  );
};
