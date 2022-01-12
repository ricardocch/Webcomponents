document.querySelector('gft-button').addEventListener('gft-button-click',()=>{

    let edad = document.querySelector('card-info').getAttribute('edad')
        
    document.querySelector('card-info').setAttribute('edad',Number(edad) + 1)
})