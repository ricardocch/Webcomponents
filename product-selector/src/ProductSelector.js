import { LitElement, html, state, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ProductSelector-styles.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-web-template-modal/bbva-web-template-modal.js';
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
    <bbva-button-default variant="primary">Default</bbva-button-default> 
    <bbva-web-template-modal heading="Modal title" description="Subtitle" button="Button Active" link="Type Link" > 
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae metus tincidunt, cursus nulla et, venenatis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ornare blandit elit vel porttitor. Phasellus ultricies eleifend quam quis rhoncus.</p> 
      <p>Fusce massa tellus, aliquam ut neque ut, ultricies sodales augue. Vivamus vitae nunc urna. Nullam et cursus ligula. Suspendisse mattis felis non molestie dictum. Donec vehicula eget turpis sed laoreet. Cras eleifend, justo eu varius tincidunt, urna dui imperdiet enim, sed posuere massa dolor vitae odio. Etiam congue aliquet magna, ac scelerisque lorem varius quis.</p> 
    </bbva-web-template-modal>   
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

    if(this.countItems === this.selected){
      this.sendEvent('product-selection',product)
    }
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
