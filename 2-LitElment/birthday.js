import { LitElement, html } from 'lit';

class Birthday extends LitElement{
    static get properties() {
        return {
          year: {type:Number,
        //   reflect:true
          //Deckara que no creen getter y setters por defecto
          //noAccesors:true
          //obsrva elatributo declarado
        //   attribute:'year'
          },
          age:{
              type:Number,
              noAccesors:true
          }
        }
      }

      //computed
      get age(){
          return this.year - 200
      }

      constructor(){
          super()
          this.year = 2010
          console.log("y",this.year);
          console.log("a",this.age);
      }

    //check request render
    //   performUpdate(){
    //       console.log('perform');
    //   }
    

    // update(){
    //     console.log('update');
    // }

    render() {
        return html`
        <h3>${this.year}</h3>
        `
    }

    firstUpdated(){
        console.log('first');
    }

    updated(){
        console.log('ya se update');
    }

    updateComplete(){
        console.log('completed');
    }
}

customElements.define('app-birthday', Birthday);