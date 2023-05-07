// main.js

const { ipcMain, app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let welcomeWindow, dashboardWindow;

function createWelcomeWindow() {
  // Create the browser window.
  welcomeWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "script/welcome_screen.js"),
    },
  });
  welcomeWindow.loadFile("windows_html/welcome_screen.html");
  welcomeWindow.maximize();
}
function createdashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "script/dashboardScreen.js"),
    },
  });
  
  dashboardWindow.loadFile("windows_html/dashboardScreen.html");
  dashboardWindow.maximize();
  
}
app.whenReady().then(() => {
  createWelcomeWindow();
  createServer();
});

ipcMain.on("welcome:close", (event, arg) => {
  welcomeWindow.close();
});
ipcMain.on("welcome:minimize", (event, arg) => {
  welcomeWindow.minimize();
});
ipcMain.on("welcome:maximize", (event, arg) => {
  if (welcomeWindow.isMaximized()) {
    welcomeWindow.unmaximize();
  } else {
    welcomeWindow.maximize();
  }
});

ipcMain.on("dashboard:close", () => {
  dashboardWindow.close();
});
ipcMain.on("dashboard:minimize", () => {
  dashboardWindow.minimize();
});
ipcMain.on("dashboard:maximize", () => {
  if (dashboardWindow.isMaximized()) {
    dashboardWindow.unmaximize();
  } else {
    dashboardWindow.maximize();
  }
});
ipcMain.on("go_to_dashboard", (event, arg) => {
  createdashboardWindow();
  welcomeWindow.close();
});

// -------------------------------RESTRICTED AREA---------------------------------------------//


// import sqllite3
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("database/masterDatabase.db", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("connected to database");
});

function addItemToStocks(Barcode, ProductName, CostPrice, SellPrice, Profit, StockQty, DicountOff) {

  let datetime = new Date();

  db.run(`INSERT INTO  stocks 
  (Barcode, ProductName, CostPrice, SellPrice, Profit, StockQty, DicountOff , UpdatedON )
   VALUES (? , ? , ? , ? , ? , ? , ? , ?)`, [Barcode, ProductName, CostPrice, SellPrice, Profit, StockQty, DicountOff, datetime],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      db.close();
    }

  );
}

function getItemFromStocks(barcode) {
  db.all(`SELECT * FROM stocks WHERE Barcode = ${barcode}`, function (err, rows) {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function searchProduct(productName) {
  db.all(`SELECT * FROM stocks WHERE ProductName like '%${productName}%'`, function (err, rows) {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
  db.close();
}

// console.log(searchProduct("A"));
// console.log(getItemFromStocks(123343));
//addItemToStocks(1343, "Amul Butter", 400, 500, 20.6, 2, 34);

// import ip from os module
const { networkInterfaces } = require("os");
let    getLocalExternalIP = () =>
    []
      .concat(...Object.values(networkInterfaces()))
      .find((details) => details.family === "IPv4" && !details.internal)
      .address;
function logIP() {
  dashboardWindow.webContents.send("ip", getLocalExternalIP() + ":" + port)
}
// sending ip when asked by dasboardScreen.js
ipcMain.on("giveip",()=>{
  logIP();
})

// import os 
const os = require("os");
// write a function to get name of device
function getDeviceName() {
  return os.hostname();
}

const http = require("http");
const host = getLocalExternalIP();
const port = 8080;

function createServer() {
  const requestListener = function (req, res) {
    const urls = req.url;
    let urls_splitted, params;

    // check if url contains ?
    if (urls.includes("?")) {
      // split url and get the first part
      urls_splitted = urls.split("?")[0];
      // parameter part
      params = urls.split("?")[1];
    }else{
      urls_splitted = urls;
    }
    switch (urls_splitted) {
      case "/connect":
        res.writeHead(200);
        res.end("CONNECTED:"+getDeviceName());
        if(params.includes("name")) deviceName = params.split("=")[1]
        console.log(deviceName);
        dashboardWindow.webContents.send("deviceName", deviceName);
        break;
      case "/addItem":
        res.writeHead(200);
        res.end("addItem Successfully" + params);
        break;
      case "/availabilityItem":
        res.writeHead(200);
        res.end("10 items available");
        break;

      default:
        res.writeHead(404);
        res.end("Not Found!");
        break;
    }
  };

  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}
// import fs
const fs = require("fs");

// open json file and write data to it
data = {
  usernname: "Seller1",
  email: "jjjgmail.coom",
  phone: "1234567890",
  password: "1234567890",
  bussinessCategory: "Electronics",
  bussinessName: "jakffibgi",
  sellerName: "bvfvf",
};
fs.writeFile("settings/sellerinfo.json", JSON.stringify(data), (err) => {
  // write data to file
  if (err) throw err;
});
