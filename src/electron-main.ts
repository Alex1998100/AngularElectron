import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Add this if using a preload script
    },
  });

  mainWindow?.loadFile(
    path.join(__dirname, '../dist/AngularElectron/index.html')
  );
  // Or loadURL if serving in development mode:
  // mainWindow?.loadURL('http://localhost:4200'); // if Angular is served on this port

  mainWindow?.on('ready-to-show', () => {
    // Prevents flicker. Only show when ready
    mainWindow?.show(); // Show the window
    if (process.env['NODE_ENV'] === 'development') {
      mainWindow?.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
