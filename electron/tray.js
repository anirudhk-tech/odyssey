import { Tray, nativeImage } from "electron";
import { join } from "node:path";

export function setTray() {
  const iconName = process.platform === "win32" ? "icon.ico" : "icon.png";

  const iconPath = join(process.resourcesPath, "assets", iconName);

  const icon = nativeImage.createFromPath(iconPath);
  if (icon.isEmpty()) {
    console.error("Tray icon not found:", iconPath);
    return;
  }
  const tray = new Tray(icon);
  tray.setToolTip("Odyssey");
  return tray;
}
