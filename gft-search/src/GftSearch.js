import { LitElement, html, css} from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';

import './GftInputText.js'
import'./GftButton.js'
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
      disableButton:{type:Boolean},
      text:{type:String}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.text = '';
    this.isButtonDisabled = true;
  }

  static get styles() {
    return [
    ];
  }

  // Define a template
  render() {
    return html`
        <gft-input-text @gft-input-fill="${this._onButtonEnable}" 
         @gft-input-empty="${this._onButtonEnable}">
         
         </gft-input-text>
         <gft-button .isDisabled="${this.isButtonDisabled}"  
          @gft-button-clicked="${this._onSearchInfo}">
            Buscar
         </gft-button>
    `;
  }

  _onButtonEnable(event){
    this.isButtonDisabled = event.detail ? false : true
    this.text = event.detail
    this.requestUpdate()
  }

  _onSearchInfo(){
    this.dispatchEvent( new CustomEvent('gft-search-info',{
      bubbles:true,
      composed:true,
      detail:this.text
  }))
  }


}
