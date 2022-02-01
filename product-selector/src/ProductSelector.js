import { LitElement, html, } from 'lit-element';
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
      name: { type: String, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'Cells';
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
      <slot></slot>
      <p>Welcome to ${this.name}</p>
    `;
  }
}
