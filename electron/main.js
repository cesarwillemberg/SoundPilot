const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
let mainWindow;

const musicDir = path.join(__dirname, "..", "public", "musics");

function createWindow() {
    nativeTheme.themeSource = "system";
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, "..", "public", "icon.png"),
        title: "SoundPilot",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: `${__dirname}/preload.js`,
        },
    });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("music-upload", (event, file) => {
    const filePath = path.join(musicDir, file.name)
    fs.writeFile(filePath, file.data, async (err) => {
        if (err) {
            mainWindow.webContents.send("toast:recive", err)
        } else {
            sendUpdatedList();
            mainWindow.webContents.send("toast:recive", "File uploaded successfully!")
        }
    })
})

ipcMain.on("music-get", () => {
    sendUpdatedList();
})

async function sendUpdatedList() {
    const files = await fs.promises.readdir(musicDir)
    mainWindow.webContents.send("music:list", files)
}

ipcMain.on("music-delete", async (event, file) => {
    const filePath = path.join(musicDir, file);
    fs.unlink(filePath, async (err) => {
        if(err) {
            mainWindow.webContents.send("toast:recive", err)
        } else {
            sendUpdatedList();
            mainWindow.webContents.send("toast:recive", "File deleted successfully!" )
        }
    })
})

ipcMain.on("music-to-play", async (event, fileName) => {
    mainWindow.webContents.send("music-playable", fileName)
});