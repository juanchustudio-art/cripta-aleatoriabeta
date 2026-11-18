const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required'); // intro con sonido y música
app.commandLine.appendSwitch('ignore-gpu-blocklist');
function crear() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({
    width: 1280, height: 720, backgroundColor: '#0d0b14', autoHideMenuBar: true, title: 'Cripta Aleatoria',
    webPreferences: { backgroundThrottling: false }
  });
  w.loadFile(path.join(__dirname, 'www', 'index.html'));
  w.webContents.on('before-input-event', (e, i) => {           // F11 = pantalla completa
    if (i.type === 'keyDown' && i.key === 'F11') w.setFullScreen(!w.isFullScreen());
  });
}
app.whenReady().then(crear);
app.on('window-all-closed', () => app.quit());
