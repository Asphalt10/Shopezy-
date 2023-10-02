const options=document.getElementById("tray");
const close_tray=document.getElementById("tray_exp");

function show(){
    options.style.display='none';
    close_tray.style.display='flex';
    
}
function hide(){
    options.style.display='flex';
    close_tray.style.display='none';
    
}