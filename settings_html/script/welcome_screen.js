// import ipc renderer
const {ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    
    //declare all the buttons
    const minimize_btn = document.getElementById('minimize_btn')
    const close_btn = document.getElementById('close_btn')
    const maximize_btn = document.getElementById('maximize_btn')
    const login_btn = document.getElementById('login_btn')
    const gotoregister_btn = document.getElementById('goToRegister')
    const registration_page = document.getElementById('register')
    const login_page = document.getElementById('log_in')
    const backtologin = document.getElementById('backtologin')
    //add event listener to buttons
    minimize_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:minimize')
    })
    close_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:close')
    })
    maximize_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:maximize')
    })
    login_btn.addEventListener('click',() => {
        ipcRenderer.send('go_to_dashboard')
   }) 
   gotoregister_btn.addEventListener('click',() => {
        login_page.style.display="none"
        registration_page.style.display="flex"
   })
   backtologin.addEventListener('click',() =>{
        login_page.style.display="flex"
        registration_page.style.display="none"
   })

})
