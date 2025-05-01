import { app, BrowserWindow, net, protocol } from "electron";
import "./ipcHandlers.js";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { setMenu } from "./menu.js";
import { setTray } from "./tray.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const preloadPath = join(__dirname, "preload.cjs");

let mainWindow;
const isDev = process.env.NODE_ENV !== "production";

const createWindow = () => {
  mainWindow = new BrowserWindow({
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
    title: "Odyssey",
  });

  mainWindow.loadURL("http://localhost:3000");
};

if (process.platform === "darwin") {
  app.dock.setIcon(join(__dirname, "assets", "icon.icns"));
}

app.whenReady().then(() => {
  setMenu();

  protocol.handle("images", async (request) => {
    const filePath = request.url.replace("images:///", "");
    return net.fetch(`file://${filePath}`);
  });

  if (!isDev) {
    const serverScript = resolve(
      __dirname,
      "..",
      ".next",
      "standalone",
      "server.js"
    );
    fork(serverScript, [], {
      cwd: resolve(__dirname, "..", ".next", "standalone"),
      stdio: "ignore",
    });

    createWindow();
  } else {
    createWindow();
  }

  setTray(mainWindow);

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
