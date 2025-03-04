const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    readProduct: () => ipcRenderer.invoke('read-product'),
    addProduct: (product) => ipcRenderer.invoke('add-product', product)
});
