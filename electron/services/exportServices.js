export const navigateToExport = (_, win) => {
  win.webContents.send("export-clicked");
};
