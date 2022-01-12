class CardInfo extends HTMLElement {
    
    constructor(){
        super()
        this.attachShadow({
            mode:'open'
        })
        this.template = document.getElementById('Card').content
        this.shadowRoot.appendChild(this.template.cloneNode(true))
        
    }



    connectedCallback(){

        if(!this.nombre) this.nombre = ''
        if(!this.apellidoPaterno) this.apellidoPaterno = ''
        if(!this.apellidoMaterno) this.apellidoMaterno = ''
        if(!this.edad) this.edad = 0;
        if(!this.color) this.color  = ''
        if(!this.city) this.city = ''
        if(!this.img) this.img = 'logo.png'
    }

    get nombre(){
        return this.getAttribute('nombre')
    }

    set nombre(value){
        this.setAttribute('nombre',value)
    }

    get apellidoPaterno(){
        return this.getAttribute('apellido-paterno')
    }

    set apellidoPaterno(value){
        this.setAttribute('apellido-paterno',value)
    }

    get apellidoMaterno(){
        return this.getAttribute('apellido-materno')
    }

    set apellidoMaterno(value){
        this.setAttribute('apellido-materno',value)
    }

    get edad(){
        return this.getAttribute('edad')
    }

    set edad(value){
        this.setAttribute('edad',value)
    }

    get color(){
        return this.getAttribute('color')
    }

    set color(value){
        this.setAttribute('color',value)
    }

    get city(){
        return this.getAttribute('city')
    }

    set city(value){
        this.setAttribute('city',value)
    }

    get img(){
        return this.getAttribute('img')
    }

    set img(value){
        this.setAttribute('img',value)
    }

    attributeChangedCallback(attr, oldValue, newValue){
    
        if(oldValue !== newValue){   
            if(attr === 'apellido-paterno'){
                this.apellidoPaterno = newValue
                this.shadowRoot.getElementById('apellidoPaterno').innerText = this.apellidoPaterno
            }
            else if(attr === 'apellido-materno'){
                this.apellidoMaterno = newValue
                this.shadowRoot.getElementById('apellidoMaterno').innerText = this.apellidoMaterno
            }
            else if(attr === 'img'){
                this.img = newValue
                console.log(this.shadowRoot.querySelector('img'));
                this.shadowRoot.querySelector('img').setAttribute('src',this.img)
            }
            else {
                this[attr] = newValue
                this.shadowRoot.getElementById(attr).innerText = this[attr] 
            }
            
        }
        
    }

    static get observedAttributes(){
        return ['nombre','apellido-paterno','apellido-materno','edad','color','city','img']
    }
}

customElements.define('card-info',CardInfo)