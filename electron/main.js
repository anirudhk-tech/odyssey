import { app, BrowserWindow } from "electron";
import "./ipcHandlers.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { setMenu } from "./menu.js";
import path from "path";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const preloadPath = join(__dirname, "preload.cjs");

let nextServerProcess;

const startNextServer = () => {
  return new Promise((resolve, reject) => {
    const projectRoot = join(__dirname, "..");
    nextServerProcess = spawn("npm", ["run", "start"], {
      cwd: projectRoot,
      shell: true,
      env: { PORT: "3000" },
    });

    nextServerProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      if (data.toString().includes("ready on")) {
        resolve();
      }
    });

    nextServerProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    nextServerProcess.on("error", (error) => {
      console.error(`Error: ${error}`);
      reject(error);
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
  startNextServer()
    .then(() => {
      createWindow();
    })
    .catch((error) => {
      console.error("Failed to start Next.js server:", error);
      app.quit();
    });

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

  app.on("quit", () => {
    if (nextServerProcess) {
      nextServerProcess.kill();
    }
  });
});
