import { app, BrowserWindow, net, protocol } from "electron";
import "./ipcHandlers.js";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { setMenu } from "./menu.js";
import { setTray } from "./tray.js";
import { fork } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const preloadPath = join(__dirname, "preload.cjs");

let mainWindow;
const isDev = false;
const assetsPath = isDev
  ? join(__dirname, "assets")
  : join(process.resourcesPath, "assets");

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: true,
    },
    icon: join(
      assetsPath,
      process.platform === "win32" ? "icon.ico" : "icon.png"
    ),
    title: "Odyssey",
  });
};

async function waitForServer(url, timeout = 10000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    try {
      const response = await net.fetch(url, { cache: "no-store" });
      if (response.ok) {
        return;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

async function waitForServerAndLoad() {
  const url = "http://127.0.0.1:3000";
  const timeout = 50000;

  try {
    await waitForServer(url, timeout);
    await mainWindow.loadURL(url);
    console.log("Electron window asked to load URL:", url);
  } catch (error) {
    console.error("Error loading URL:", error);
    app.quit();
  }
}

if (process.platform === "darwin") {
  app.dock.setIcon(join(assetsPath, "icon.icns"));
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
    const appRoot = resolve(__dirname, "..", ".next", "standalone");

    const child = fork(serverScript, [], {
      cwd: appRoot,
      execArgv: ["--experimental-default-type=commonjs"],
      stdio: ["pipe", "pipe", "pipe", "ipc"],
    });

    child.stdout.on("data", (d) => console.log("[next]", d.toString()));
    child.stderr.on("data", (d) => console.error("[next:err]", d.toString()));
    child.on("exit", (code) =>
      console.error(`[next] exited with code ${code}`)
    );

    createWindow();
    waitForServerAndLoad();
  } else {
    createWindow();
    mainWindow.loadURL("http://localhost:3000");
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
