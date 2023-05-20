let 
 accountpage ,invoicepage ,integrationpage,
analyticspage,stockspage,personalisationpage ,accountbtn,invoicebtn,
personalisationbtn,stocksbtn,integrationbtn

let lastselectedbtn


window.addEventListener("DOMContentLoaded", () => {
    accountpage = document.getElementById('account_menu')
    invoicepage = document.getElementById('invoice_menu')
    personalisationpage = document.getElementById('personalisation_menu')
    stockspage = document.getElementById('stocks_menu')
    integrationpage= document.getElementById('integration_menu')
    accountbtn=document.getElementById('account_background')
    invoicebtn=document.getElementById('invoice_background')
    personalisationbtn=document.getElementById('personalisation_background')
    stocksbtn=document.getElementById('stocks_background')
    integrationbtn=document.getElementById('integration_background')
    function changepagesettings(pagename,btnname) {
    
    btnname.addEventListener('click',() => {
        accountpage.style.display='none'
        invoicepage.style.display='none'
        integrationpage.style.display='none'
        // analyticspage.style.display='none'
        personalisationpage.style.display='none'
        stockspage.style.display='none'
        lastselectedbtn.style.backgroundColor='#ffffff'
        pagename.style.display='block'
        btnname.style.backgroundColor='#4087F3'
        
        lastselectedbtn=btnname
    
    })

}

// accountpage = document.getElementById('')
lastselectedbtn=accountbtn
changepagesettings(accountpage,accountbtn)
changepagesettings(invoicepage ,invoicebtn)
changepagesettings(personalisationpage,personalisationbtn)
changepagesettings(stockspage,stocksbtn)
changepagesettings(integrationpage,integrationbtn)

// changepagesettings('account_menu','account_background')

}
)

