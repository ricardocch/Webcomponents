import { LitElement, html, css} from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './GftSearch-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<gft-search></gft-search>
```

##styling-doc

@customElement gft-search
*/
export class GftSearch extends LitElement {
  static get is() {
    return 'gft-search';
  }

  // Declare properties
  static get properties() {
    return {
      text: { type: String, },
      disableButton:{type:Boolean}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.text = '';
    this.disableButton = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('gft-search-shared-styles'),
      css`button:disabled{
        background-color:#bfa8ff;
      }
      button{
        background-color:#6b37ff;
        color:white;
        border:1px solid;
        padding:5px;
      }
      `
    ];
  }

  // Define a template
  render() {
    return html`
      <input type="text" @input='${this.onInput}'/>
      <button ?disabled='${this.disableButton}' @click='${this.onClick}'>Buscar</button>
    `;
  }

  onInput(event){
    this.text = event.target.value

    this.disableButton = this.text ? false : true
  }

  onClick(){
    console.log({
      searchPram:this.text
    });
    this.dispatchEvent( new CustomEvent('gft-search-click',{
        bubbles:true,
        composed:true,
        detail:{
          searchPram:this.text
        }
    }))
  }

}
