const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const getProductsFilePath = () => {
    return path.join(app.getPath('userData'), 'product.json');
};

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

};

ipcMain.handle('read-product', async () => {
  const filePath = path.join(app.getPath('userData'), 'product.json');

  if (fs.existsSync(filePath)) {
      try {
          const data = fs.readFileSync(filePath, 'utf8').trim();
          if (data === '') {
              return []; 
          }

          const parsedData = JSON.parse(data);
          return Array.isArray(parsedData) ? parsedData : [];
      } catch (error) {
          console.error('Error reading product file:', error);
          return []; 
      }
  }

  return []; 
});

ipcMain.handle('add-product', async (event, newProduct) => {
  const filePath = path.join(app.getPath('userData'), 'product.json');

  let products = [];

  if (fs.existsSync(filePath)) {
      try {
          const data = fs.readFileSync(filePath, 'utf8').trim();
          if (data) {
              products = JSON.parse(data);  
          } else {
              products = [];  
          }
      } catch (error) {
          console.error('Error reading product file:', error);
          products = [];  
      }
  }


  products.push(newProduct);


  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

  return products;  
});


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
