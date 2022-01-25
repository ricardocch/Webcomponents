import { LitElement,html,css } from "lit";

import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';

class MyElement extends LitElement{
    static get properties(){
        return{ 
            name:{
                type:String,
                reflect:true
            },
            text:{
                type:String
            },
            disabled:{
                type:Boolean,
                reflect:true
            }
        }
    }

    constructor(){
        super();
        this.name = 'Ricardo'
        this.text =  'Hola  mundo'
        this.disabled = false
    }


    render(){
        return html`
        <p @click=${this.onclick}>${this.text} ${this.name}</p>
        <!-el ? es para que se visualice o elimine un atributo-->
        <input @input=${this.changeText} type='text' ?disabled='${this.disabled}'/>
        <label>Desabilitar/habilitar</label><input type="checkbox"  @click=${this.disabledInput}/>
        <slot></slot>
        `
    }

    onclick(){
        this.name = 'Fox Chanel'
    }

    changeText(event){
        this.text = event.target.value
    }

    disabledInput(){
        console.log(this.disabled);
        this.disabled = !this.disabled
    }
}

customElements.define('my-element',MyElement)

class ToDoList extends LitElement {

    static get properties(){
        return {
            toDos:{
                type:Array,
                state:true
            },
            displayItems:{
                type:Object,
                state:true
            }
        }
    }

    constructor(){
        super()
        this.toDos = []
        this.displayItems = null
    }

    //solucion documentación
    // render() {
    //     return html`
    //       <h2>To Do</h2>
    //       <ul>
    //         ${this.toDos.map((item) => html`<li>${item.text}</li>`)}
    //       </ul>
    //       <input id="newitem" aria-label="New item">
    //       <button @click=${this.addToDo}>Add</button>
    //     `;
    //   }
    
    
    //   get input() {
    //     return this.renderRoot.querySelector('input') ;
    //   }
    
    //   addToDo() {
    //     this.toDos.push({text: this.input.value, completed: false});
    //     this.input.value = '';
    //     this.requestUpdate();
    //   }

    //mia
    render(){
        return html`
            <input type="text" /> <button @click=${this.addToDoItem}>Agregar</button>
            <div>
             ${this.displayItems}
            </div>
        `
    }

    addToDoItem(){
        let items = null;
        this.toDos.push(this.renderRoot.querySelector('input').value)
        items = this.toDos.map(el => html`<li>${el}</li>`)
        this.displayItems = html`
            <ul>
                ${items}
            </ul>
        `
    }
}

customElements.define('app-todo',ToDoList)


class Visual extends LitElement {
     
    //Version 1
    // static get  properties(){
    //     return {
    //         color:{
    //             type:String,
    //             reflect:true
    //         },
    //         theme:{
    //             type:String,
    //             state:true
    //         }
    //     }
    // }

    //version 2
    static properties  = {
                color:{
                    type:String,
                    reflect:true
                },
                theme:{
                    type:String,
                    state:true
                },
                dinamycClass:{},
                dinamycStyles:{}
            }

    //version 1 con polymer server
    // static get styles(){
    //     console.log(this.color);
    //     return  css`
    //     .fondo{
    //         background-color:red;
    //     }
    //     `;  
    // }

    //Version 2 con web dev server
    static styles = css `
        .fondo{
            background-color:red;
        }

        .amarillo{
            background-color:yellow;
            height:200px;
            width:350px;
        }

    `
    constructor(){
        super()
        this.color = 'blue'
        this.theme = ''
        this.dinamycClass = {amarillo:true}
        this.dinamycStyles = {backgroundColor:'#FEAE2E',height:'200px',width:'200px'}
        
     }

     willUpdate(properties){
        console.log(properties);
        this.dinamycStyles = {backgroundColor:'green',height:'200px',width:'200px'}
    }



     render(){
         return html`
         <style>
         .color{color:${this.color}}
         </style>
            <div class=${this.theme ? 'fondo' : ''} @click=${this.onclick}>
                <p class='color'>Este componente es visual</p>
            </div>
            <div class=${classMap(this.dinamycClass)} @click=${this.changeClass}>

            </div>
            <div style=${styleMap(this.dinamycStyles)} @click=${this.changeStyle}>
            </div>
         `
     }

     changeStyle(){
         this.dinamycStyles = {backgroundColor:'#FE9E9E',height:'300px',width:'500px'}
     }

     changeClass(){
         this.dinamycClass = {amarillo:false}
     }
     onclick(){
         this.theme = !this.theme ? 'fondo' : ''
     }
}

customElements.define('app-visual',Visual)