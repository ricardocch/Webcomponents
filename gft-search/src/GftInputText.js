import { LitElement, html} from 'lit-element';

/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<gft-input-text></gft-input-text>
```

##styling-doc

@customElement gft-input-text
*/
export class GftInputText extends LitElement {
  static get is() {
    return 'gft-input-text';
  }

  // Declare properties
  static get properties() {
    return {
      text: { type: String, }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.text = '';
  }

  static get styles() {
    return [
    ];
  }

  // Define a template
  render() {
    return html`
      <input type="text" @input="${this._onInput}"/>
    `;
  }


  _onInput(event){
    this.text = event.target.value;
    if(this.text !==  ""){
        this.dispatchEvent( new CustomEvent('gft-input-fill',{
            bubbles:true,
            composed:true,
            detail:this.text
        }))
    }
    else{
        this.dispatchEvent( new CustomEvent('gft-input-empty',{
            bubbles:true,
            composed:true,
            detail:this.text
        }))
    }
  }

}
