class GftButton extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({
            mode:'open'
        })

        this.shadowRoot.addEventListener('click',this.onclick)
    }

    connectedCallbck(){
        
        if(!this.color) this.color = ''
        if(!this.texto) this.texto = ''
        if(!this.borderSize) this.borderSize = 0

    }

    onclick(){
        let edad = document.querySelector('card-info').getAttribute('edad')
        
        document.querySelector('card-info').setAttribute('edad',Number(edad) + 1)
    }

    render(){
        this.shadowRoot.innerHTML = `
        <style>
            button{
                background-color:${this.color};
                border: ${this.borderSize}px solid black
            }
        </style>
        <button>${this.texto}</button>`
    }


    get color(){
        return this.getAttribute('color')
    }

    set color(value){
        this.setAttribute('color',value)
    }

    get texto(){
        return this.getAttribute('texto')
    }

    set texto(value){ 
        this.setAttribute('texto',value)
    }

    get borderSize(){
        return this.getAttribute('border-size')
    }

    set borderSize(value){
        this.setAttribute('border-size',value)
    }

    attributeChangedCallback(attr, oldValue, newValue){

        if(oldValue !==  newValue){
            if(attr === 'border-size')
                this.borderSize = newValue
            else
                this[attr] = newValue

            this.render()
        }
        
    }

    static get observedAttributes(){
        return ['color','texto','border-size']
    }

}

customElements.define('gft-button',GftButton)