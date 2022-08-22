const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setUid: (uid) => ipcRenderer.send('set-uid', uid),
    showHelper: () => ipcRenderer.send('show-helper', true),
    hideHelper: () => ipcRenderer.send('hide-helper', true),
});

contextBridge.exposeInMainWorld('data', {
    uid: process.env.uid,
});