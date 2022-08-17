const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setUid: (uid) => ipcRenderer.send('set-uid', uid)
});