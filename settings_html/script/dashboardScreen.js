let expandMenuBtn,
    tray,
    profilepic,
    menuExpanded = true,
    close_btn, minimize_btn, maximize_btn
    ,AndroidConnect, DBcontent, QRscreen,
    CloseHTC , settingsbtn ,side_tray ,
    dashbar ,setpage,homebtn, invoiceBTN, invoiceBTN2
    ,StocksBTN,StockPage;
const { ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
    expandMenuBtn = document.getElementById("expandMenuBtn");
    tray = document.getElementById("tray");
    close_btn = document.getElementById("close_btn");
    minimize_btn=document.getElementById("minimize_btn");
    maximize_btn=document.getElementById("maximize_btn");
    profilepic = document.getElementById("profilepic");
    
    AndroidConnect = document.getElementById("Connect_btn");
    DBcontent = document.getElementById("contents");
    QRscreen = document.getElementById("blur_bg");
    CloseHTC = document.getElementById("close_btn_htc");
    settingsbtn = document.getElementById('gotosettingsbtn')
    dashbar = document.getElementById('dashbar')
    side_tray = document.getElementById('side_tray')
    setpage = document.getElementById('setpage')
    homebtn=document.getElementById("goToHome");
    invoiceBTN=document.getElementById("invoiceBTN");
    invoiceBTN2=document.getElementById("new_invo");
    invoicePage=document.getElementById("invoicePage");
    StocksBTN=document.getElementById("StocksBTN");
    StockPage=document.getElementById("StockPage");

    minimize_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:minimize");
    });
    close_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:close");
    });
    maximize_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:maximize");
    });
    expandMenuBtn.addEventListener("click", () => {
        collapseExpandMenu();
    });
    expandMenuBtn.click();
//  android connect
    AndroidConnect.addEventListener('click',() =>{
        // DBcontent.style.display="none";
        QRscreen.style.display="flex";
    })
    
    CloseHTC.addEventListener('click',() =>{
        // DBcontent.style.display="flex";
        QRscreen.style.display="none";
    })
    settingsbtn.addEventListener('click',() => {
        dashbar.style.display="none"
        side_tray.style.display="none"
        setpage.style.display="flex"
        invoicePage.style.display="none";
        StockPage.style.display="none";
    })
    
    invoiceBTN.addEventListener('click',()=>{
        invoicePage.style.display="flex";
        dashbar.style.display="none";
        side_tray.style.display="none";
        setpage.style.display = "none";
        StockPage.style.display="none";
    })

    invoiceBTN2.addEventListener('click', ()=>{
        invoicePage.style.display="flex";
        dashbar.style.display="none";
        side_tray.style.display="none";
        setpage.style.display = "none";
    })

    homebtn.addEventListener('click',()=>{
        // Setting to dashboard
            setpage.style.display="none";
            dashbar.style.display="flex";
            side_tray.style.display="flex";
            invoicePage.style.display="none";
            StockPage.style.display="none";
    })
    StocksBTN.addEventListener('click',()=>{
        dashbar.style.display="none";
        side_tray.style.display="none";
        StockPage.style.display="block";
        invoicePage.style.display="none";
        setpage.style.display="none";
    })
    // getting ip from index.js
    ipcRenderer.send("giveip")
    // setting ip in hiddenIP div
    ipcRenderer.on("ip", (e,url)=>{
        console.log(url)
       document.getElementById("hiddenIP").innerHTML=url;
    })

    ipcRenderer.on("deviceName", (e,deviceName)=>{
        document.getElementById("connectionProperties").innerHTML = "Connected to " + deviceName
        document.getElementById("connectionProperties").style.color = "green"
        document.getElementById("connection_icon").style.filter = "grayscale(100%)"
        document.getElementById("Connect_btn").value = "Disconnect"
        CloseHTC.click();
        
    })
});
function collapseExpandMenu() {
    allSpans = document.getElementById("tray").getElementsByTagName("span");
    if (menuExpanded) {
        // add animation for changing width
        tray.animate([{ width: "15%" }, { width: "5%" }], {
            duration: 500,
            fill: "forwards",
        });
        tray.style.width = "5%";
        for (let i = 0; i < allSpans.length; i++) {
            allSpans[i].style.opacity = "0";
            allSpans[i].style.transition = "opacity 0.5s";
            profilepic.style.marginLeft = "10px";
        }
    } else {
        // add animation for changing width
        tray.animate([{ width: "5%" }, { width: "15%" }], {
            duration: 500,
            fill: "forwards",
        });

        tray.style.width = "15%";
        for (let i = 0; i < allSpans.length; i++) {
            allSpans[i].style.opacity = "1";
            allSpans[i].style.transition = "opacity 0.5s";
            profilepic.style.marginLeft = "0px";
        }
    }
    menuExpanded = !menuExpanded;
}


