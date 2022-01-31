/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: inline-block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

button:disabled {
  background-color: #bfa8ff;
}

button {
  background-color: #6b37ff;
  color: white;
  border: 1px solid;
  padding: 5px;
}
`;