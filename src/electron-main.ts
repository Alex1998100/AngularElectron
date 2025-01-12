import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let win: BrowserWindow | null;

const createWindow = () => {
    console.log("__dirname:", __dirname);
    console.log('preload path:', path.resolve(__dirname, '..', '..', 'dist', 'angular-electron1', 'browser', 'preload.js')) 
    console.log('index.html path:', path.resolve(process.cwd(), 'dist', 'angular-electron1', 'browser', 'index.html'))
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, 
            //preload: path.resolve(__dirname, '..', '..', 'dist', 'angular-electron1', 'browser', 'preload.mjs'),
            //preload: 'E:\\Angular\\AngularElectron1\\AngularElectron1\\dist\\angular-electron1\\browser\\preload.mjs' 
            },
    });
    const indexPath = path.resolve(process.cwd(), 'dist', 'angular-electron1', 'browser', 'index.html');
    win.loadFile(indexPath);
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});