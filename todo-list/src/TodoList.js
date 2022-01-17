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
      todo: { type: Array,state:true }
  }

  // Initialize properties
  constructor() {
    super();
    this.todo = [];
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('todo-list-shared-styles')
    ];
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <input type='text' /> <button @click=${this.onClick}>Agregar</button>
      <div>
        <ul>
          ${this.todo.map(el => html`<li>${el}</li>`)}
        </ul>
      </div>
    `;
  }

  onClick(){
    let toDoItem = this.renderRoot.querySelector('input')
    this.todo.push(toDoItem.value)
    toDoItem.value = ''
    this.requestUpdate();
  }
}
