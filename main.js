// main.js

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Cria uma janela de navegação.
    const win = new BrowserWindow({
        width: 800, // Largura da janela
        height: 600, // Altura da janela
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Carrega o arquivo index.html
    win.loadFile('index.html');
}

// Este método será chamado quando o Electron terminar de inicializar e estiver pronto para criar janelas do navegador.
app.on('ready', createWindow);

// Sair quando todas as janelas estiverem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // No macOS, é comum recriar uma janela no aplicativo quando o ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
