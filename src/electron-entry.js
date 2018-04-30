const electron = require('electron');
const app = electron.app;
const BrowserWindor = electron.BrowserWindow;

let win;

// creamos la ventana de sistema
function createWindow(){
    win = new BrowserWindow({width: 800, height: 600});

    win.loadUrl("http://localhost:3000");

    win.webContents.openDevTools();

    win.on('close', function(){
        win = null;
    });
}

// en el estado de listo la creamos
app.on('ready', createWindow);

// En el estado de cerrar todas las ventanas salir del app
app.on('window-all-closed', function(){
    app.quit();
});

// Cuendo iniciemos el app creamos las ventana
app.on('activate', function(){
    if(win == null){ 
        createWindow();
    }
});