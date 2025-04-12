import { app, BrowserWindow } from "electron";
import "./ipcHandlers.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { setMenu } from "./menu.js";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const preloadPath = join(__dirname, "preload.cjs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: true,
    },
    icon:
      process.platform == "win32"
        ? path.join(__dirname, "assets", "icon.ico")
        : path.join(__dirname, "assets", "icon.png"),
  });

  win.loadURL("http://localhost:3000");
};

if (process.platform === "darwin") {
  app.dock.setIcon(path.join(__dirname, "assets", "icon.icns"));
}

setMenu();

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
