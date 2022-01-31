import { LitElement, html, css} from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './GftSearch-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<gft-button></gft-button>
```

##styling-doc

@customElement gft-button
*/
export class GftButton extends LitElement {
  static get is() {
    return 'gft-button';
  }

  // Declare properties
  static get properties() {
    return {
      color: { type: String, },
      isDisabled:{type:Boolean}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.color = '';
    this.isDisabled = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('gft-button-shared-styles')
    ];
  }

  // Define a template
  render() {
     
    return html`
      <button ?disabled="${this.isDisabled}" @click="${this._onClick}" 
        style="background-color:${this.color};">
        <slot></slot>
      </button>
    `;
  }


  _onClick(){

    this.dispatchEvent( new CustomEvent('gft-button-clicked',{
        bubbles:true,
        composed:true,
        detail:this.isDisabled
    }))
  }

}
