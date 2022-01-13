import { html, render } from 'lit-html';

class PasswordChecker extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.password = this.getAttribute('password');
    }
    
}