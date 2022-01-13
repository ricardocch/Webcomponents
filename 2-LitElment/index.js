import {html, render} from 'lit-html'



const template = name => html`
    <button ?disabled=${false} .lista=${user} @click=${() => console.log('hla mundo click')}>Hola ${name}</button>
    `

const h1 = document.createElement('h1');
h1.textContent = 'Chapter 1'


const iterable = ["Java","Javascript"].map( el => html`<li>${el}</li>`)
const templateWithImportNode = name => html`
    <span>Hola</span> 
    ${h1}
    ${iterable}
`

let user = [1,2,3]


render(template('Ricardo'),document.querySelector('body'))
// se  re-escribe el componente
render(template('Cesar'),document.querySelector('body'))

render(templateWithImportNode(),document.getElementById('import'))
const customList = document.querySelector('button');
console.log(customList.lista)