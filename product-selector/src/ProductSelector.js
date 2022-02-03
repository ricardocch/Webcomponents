import { LitElement, html, state, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ProductSelector-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<product-selector></product-selector>
```

##styling-doc

@customElement product-selector
*/
export class ProductSelector extends LitElement {
  static get is() {
    return 'product-selector';
  }

  // Declare properties
  static get properties() {
    return {
      items: { 
        type:Array
       },
      type:{type:String},
      selected:{type:Number},
      countItems:{
        type:Number,
        state:true,
        hasChanged:(newValue,oldValue) =>{
          return newValue >= 0 ;
        }
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.items = []
    this.type = "card"
    this.selected = -1;
    this.countItems = -1;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('product-selector-shared-styles')
    ];
  }

  // Define a template
  render() {
    return html`

        ${this.items.map( (item) => {
            return html`
                <h3>${item.currency}</h3>
                ${ item.products.map( product => this.renderProducts(product,this.countItems))}
              `
          } )
        }
        <slot></slot>
    `;
  }

  updated(changedProperties) {
    if (this.countItems >= this.selected ||  this.selected > this.countItems ) {
      this.countItems = -1;
    }
  }

  renderProducts(product,index){
    
    let currentItem = index + 1;
    this.countItems += 1;
    const productTpl = this.getProductTpl(product)
    const infoProducts = this.getDivWithClass('infoProduct',productTpl)

    const div = this.getDivWithClass('products',html`
    
        <input type="radio" name="products" .checked="${this.countItems === this.selected}" 
        @click="${() => this.handleSelection(product,currentItem )}"/>
        ${ this.type === "card" ? html`<img src="./assets/icon.png" alt="icono"/>` : html``}<label>${product.alias}</label><br/><br/> 
          ${infoProducts}      
      `)

    return div;
  }

  getProductTpl({printedNumber, entity, balance}){
    return html`
      <label>Number: </label><span>${printedNumber}</span><br/><br/>
      ${ entity ? html`<label>Entity: </label><span>${entity}</span><br/><br/>` : ''}
      <label>Balance: </label><span>${balance}</span><br/><br/>
    `;
  }

  getDivWithClass(className, template){
    return html`<div class="${className}">
      ${template}
    </div>`;
  }

  

  cleanSelection(){
    this.selected = -1;
    this.countItems = -1
    this.sendEvent('clean-selection','selección limpia')
  }

  handleSelection(product,index){
    
    this.selected = index
    this.sendEvent('product-selection',product)
    
  }

  sendEvent(eventName,detail,bubbles = true,composed = true){
    this.dispatchEvent(
      new CustomEvent(eventName,{
        bubbles,
        composed,
        detail:detail
      })
    )
  }

}
