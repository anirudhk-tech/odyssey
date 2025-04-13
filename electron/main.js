import { app, BrowserWindow } from "electron";
import "./ipcHandlers.js";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { setMenu } from "./menu.js";
import next from "next";
import express from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
const preloadPath = join(__dirname, "preload.cjs");
const dev = true;

const startNextServer = async () => {
  const projectRoot = resolve(__dirname, "..");

  const nextApp = next({ dev, dir: projectRoot });
  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();

  const server = express();
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  return new Promise((resolve, reject) => {
    server.listen(3000, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Next.js server is running on http://localhost:3000");
        resolve();
      }
    });
  });
};

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
        ? join(__dirname, "assets", "icon.ico")
        : join(__dirname, "assets", "icon.png"),
  });

  win.loadURL("http://localhost:3000");
};

if (process.platform === "darwin") {
  app.dock.setIcon(join(__dirname, "assets", "icon.icns"));
}

// setMenu();

app.whenReady().then(() => {
  if (!dev) {
    startNextServer()
      .then(() => {
        createWindow();
      })
      .catch((error) => {
        console.error("Failed to start Next.js server:", error);
        app.quit();
      });
  } else {
    createWindow();
  }

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
