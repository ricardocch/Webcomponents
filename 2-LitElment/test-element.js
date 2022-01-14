import { LitElement, html } from 'lit';

class TestElement extends LitElement{
    static get properties() {
        return {
          password: String
        }
      }
    
      isValid(passwd) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
        return re.test(passwd);
      }
    
    // For don´t use shadow Dom
    //   createRenderRoot() {
    //     return this;
    //   }
      render() {
        return html`
        <br/> <br/><strong>Lit Element component</strong><br/>
          <span>Your password is <strong>${this.isValid(this.password) ? 'valid 👍' : 'INVALID 👎'}</strong></span>
          ${this.isValid(this.password) ?
            html`<div>Strength: <progress value=${this.password.length-3} max="5"</progress></div><br/><br/>` : html`<br/><br/>`}`;
    
      }
}

customElements.define('test-element', TestElement);