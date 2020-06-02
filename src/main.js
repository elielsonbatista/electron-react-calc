const { app, BrowserWindow } = require('electron');
let win;

function createWindow () {
    win = new BrowserWindow({
        width: 350,
        height: 480,
        resizable: false
    });

    win.loadFile('build/index.html');
    
    win.on('closed', () => {
        win = null;
    });

    win.fullScreenable = false;
}

app.disableHardwareAcceleration();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
