import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './TodoList-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<todo-list></todo-list>
```

##styling-doc

@customElement todo-list
*/
export class TodoList extends LitElement {
  static get is() {
    return 'todo-list';
  }

  // Declare properties
  static  properties = {
      todo: { type: Array,state:true },
      currentToDoItem: { type: String,state:true },
      name:{type:String, 
        noAccessor:true, 
        hasChanged(newValue,oldValue){
          console.log('cambio');
          // console.log('old',oldValue);
          // console.log('new',newValue);
          if(newValue !== "guerron".toLocaleUpperCase() || newValue !== "guerron" ) return newValue
        }
      },
      moneda:{
        reflect: true,
        converter:{
          fromAttribute: (value,type) =>{
            
            return '$'+value
          },
          toAttribute: (value, type) => {
            // `value` is of type `type`
            // Convert it to a string and return it
            return value
          }
        }
      }

  }

  // Initialize properties
  constructor() {
    super();
    this.todo = [];
    this.currentToDoItem = ''
    this.name = 'Alfonso'
    this.moneda = 'adeu'
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('todo-list-shared-styles')
    ];
  }

  get name(){
    return this._name;
  }

   set name(value){
    console.log('seteo');
    const oldValue  = value;
     this._name = value.toUpperCase();
     this.requestUpdate('name',oldValue)
  }

  // hacer una tarea colateral de nuestro componenete
  performUpdate(){

  }

  // se queda con el valor que tiene anes del render
  shouldUpdate(properties){
    
    let moneda = properties.get('moneda') ? properties.get('moneda').replace("$","")  : 0
    moneda = parseInt(moneda)
    // console.log(moneda);
    // console.log(this.moneda);
    return  moneda < 3599
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <input type='text' @input=${this.onInput} /> <button @click=${this.onClick}>Agregar</button>
      <div>
        <ul>
          ${this.todo.map(el => html`<li>${el}</li>`)}
        </ul>
      </div>
      <div>
       Hola ${this.name} ${this.moneda}
      </div>
    `;
  }

  //solo hago una acción en el primera renderización
  firstUpdated(properties){
    console.log(properties);
  }

  //ejecuta acciones cuando el comonente se actualizo
  // las properties son un Map de javascript
  updated(properties){
    
    //verifica si la actualización ya termino
    // await this.updateComplete()
  }

  
  onClick(){
    // let toDoItem = this.renderRoot.querySelector('input')
    // this.todo.push(this.currentToDoItem )
    this.todo = [...this.todo,this.currentToDoItem]
    // this.currentToDoItem  = ''
    // this.requestUpdate();
  }

  onInput(event){
    this.currentToDoItem = event.target.value
  }
}
