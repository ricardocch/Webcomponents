/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
  background-color: #106ebd;
  padding: 10px;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

h3 {
  color: white;
}

.products {
  background-color: #f7f2f7;
  margin-bottom: 10px;
  padding: 10px 20px;
}
.products img {
  position: relative;
  top: 10px;
  margin-right: 5px;
}
.products .infoProduct label {
  font-weight: 500;
}
.products .infoProduct span {
  font-size: 15px;
}
`;