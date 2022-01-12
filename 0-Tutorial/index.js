// custom elemnts y shadow DOM
class Saludo extends HTMLElement{
    constructor(){
        super()
        console.log('saludo');
        this.text = 'Hola'
        this.attachShadow({
            mode:'open'
        })

        this.template = document.importNode(document.getElementById('Mostar').content,true)
    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log(name,oldValue,newValue);
        //si el shadow dom está activo no muestra el  html interno, se  dbe agregar al shadow Dom
        this.innerHTML = `<p>${this.text} ${newValue}</p>`
    }

    connectedCallback(){
        console.log('conectao');
        this.shadowRoot.append(this.template)
    }

    disconnectedCallback(){
        console.log('Desconectado');
    }

    static get observedAttributes(){
        return ['name']
    }
}

customElements.define('app-saludo',Saludo)

class Avanzado extends HTMLElement{
    constructor(){
        super()
        console.log('Const Avanzado');
        this.text = 'Hola'
        this.attachShadow({
            mode:'open'
        })

        this.template = document.importNode(document.getElementById('MostarAV').content,true)
    }


    connectedCallback(){
        console.log(this.template);
        this.shadowRoot.append(this.template)   
    }

    disconnectedCallback(){
        console.log('Desconectado Av');
    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log(name,oldValue,newValue);
        //si el shadow dom está activo no muestra el  html interno, se  dbe agregar al shadow Dom
        let el = document.createElement('p').innerHTML = newValue
        this.shadowRoot.append(el)
    }

    static get observedAttributes(){
        return ['name']
    }

}

window.customElements.define('app-avanzado',Avanzado)