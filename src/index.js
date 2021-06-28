const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');
let win;

app.whenReady().then(async () => {
    win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
        }
    });
    await win.loadFile('./index.html');
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('ytLink', async (event, args) => {
    console.log(args);
    let data = await ytdl.getInfo(args);
    console.log(data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url);

    win.webContents.send("ytThumbRes", {
        thumb: data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url,
        id: data.videoDetails.videoId,
        url: args
    });
});
ipcMain.on('saveThingy', async (event, args) => {
    let savedDialog = await dialog.showSaveDialog(win, {
        buttonLabel: "Save Video",
        defaultPath: `${args.id}.mp4`
    });
    if (savedDialog.canceled) {
        return;
    } else {
        console.log(savedDialog.filePath);
        ytdl(args.url).pipe(fs.createWriteStream(savedDialog.filePath));
    }

});
