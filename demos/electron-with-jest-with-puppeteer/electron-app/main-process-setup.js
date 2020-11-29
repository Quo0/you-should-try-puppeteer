const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow({ windowList, name, width, height }) {
  const win = new BrowserWindow({    
    icon: path.join(__dirname, 'build', 'icon.ico'),
    width,
    height, 
    webPreferences: {
      nodeIntegration: true
    }
  });

  windowList[name] = win;
  win.loadURL(`file://${path.join(__dirname, 'browser-windows', name, `${name}.html`)}`);
  win.on('closed', () => closeWindow({ windowList, name }));
};

function closeWindow({ windowList, name }) {
  name === 'main' ? app.quit() : windowList[name] = null; delete windowList[name];
};

function setupMenu(windowList) {
  const mainMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open registration window',
          accelerator: 'Ctrl+W',
          click: () => !windowList.registration && createWindow({
            windowList,
            name: 'registration',
            width: 450,
            height: 250
          })
        },
        {
          label: 'Quit',    
          accelerator: 'Ctrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Toggle devtools',
      accelerator: 'Ctrl+I',
      click: (_item, focusedWindow) => focusedWindow.toggleDevTools()
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenuTemplate));
};

module.exports = {
  createWindow,
  setupMenu
};
