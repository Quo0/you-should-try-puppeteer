const { app, ipcMain } = require('electron');
const { createWindow, setupMenu } = require('./main-process-setup.js');
const { events } = require('./constants/constants.js')

const windowList = {};
setupMenu(windowList);

app.commandLine.appendSwitch('remote-debugging-address', '0.0.0.0');
app.commandLine.appendSwitch('remote-debugging-port', '7777');

app.on('ready', createWindow.bind(null, {
  windowList,
  name: 'main',
  width: 600,
  height: 300
}));
app.on('window-all-closed', () => app.quit());

ipcMain.on(events.SIGN_UP.showRegistrationForm, () => {
  !windowList.registration && createWindow({
    windowList,
    name: 'registration',
    width: 450,
    height: 250
  })
});

ipcMain.on(events.SIGN_UP.success, (_, value) => {  
  windowList.main.send(events.SIGN_UP.success, value);
  windowList.registration = null;
});
