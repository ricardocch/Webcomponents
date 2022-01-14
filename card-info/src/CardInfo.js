import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CardInfo-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<card-info></card-info>
```

##styling-doc

@customElement card-info
*/
export class CardInfo extends LitElement {
  static get is() {
    return 'card-info';
  }

  // Declare properties
  static get properties() {
    return {
      img: { type: String, },
      nombre: { type: String, },
      apellidoPaterno: { type: String, attribute:'apellido-paterno'},
      apellidoMaterno: { type: String, attribute:'apellido-materno'},
      edad: { type: Number, },
      color: { type: String, },
      ciudad: { type: String, },

    };
  }

  // Initialize properties
  constructor() {
    super();
    this.img = 'logo.png';
    this.nombre = 'Cells';
    this.apellidoPaterno = 'Lit';
    this.apellidoMaterno = 'Element';
    this.edad = 20;
    this.color = 'Azul';
    this.ciudad = 'Guadalajara';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('card-info-shared-styles')
    ];
  }

  // Define a template
  render() {
    return html`
    <div>
        <img src="./assets/${this.img}" alt="imagen default" width="200">
        <br/>
        <span>Nombre:</span><span>${this.nombre}</span><br>
        <span>Apellido Paterno:</span><span>${this.apellidoPaterno}</span><br>
        <span>Apellido Materno:</span><span >${this.apellidoMaterno}</span><br>
        <span>Edad:</span><span >${this.edad}</span><br>
        <span>Color:</span><span>${this.color}</span><br>
        <span>City:</span><span>${this.ciudad}</span><br>
    </div>
    <slot></slot>
    `;
  }
}
