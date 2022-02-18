import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing'; // eslint-disable-line import/no-extraneous-dependencies
import '../product-selector.js';
import {ONE_CURRENCY,MULTI_CURRENCY} from '../demo/moks.js'
import sinon from 'sinon'

suite('Renderizar Productos', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<product-selector></product-selector>`);
    await el.updateComplete;
  });

  test('El product selector debe estar vacio si no hay items', async () => {
    el.items = []
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('h3');
    assert.equal(element.length, 0);
  });

  test('El product selector debe contener un titulo de moneda cuando solo hay una moneda', async () => {
    el.items = ONE_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('h3');
    assert.equal(element.length, 1);
  });

  test('El product selector debe contener al menos 2 titulo de moneda cuando hay varias monedas moneda', async () => {
    el.items = MULTI_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('h3');
    assert.isAtLeast(element.length, 2);
  });

});


suite('Funcionamiento de atributos', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<product-selector></product-selector>`);
    await el.updateComplete;
  });

  test('El product selector debe tener un producto seleccionado cuando el atributo selected sea menor al numero de items', async () => {
    el.selected = 1;
    el.items = ONE_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('input[name="products"]:checked');
    assert.equal(element.length, 1);
  });

  test('El product selector no debe tener producto seleccionado cuando el atributo selected sea mayor o igual al numero de items', async () => {
    el.selected = 100;
    el.items = ONE_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('input[name="products"]:checked');
    assert.equal(element.length, 0);
  });

  test('El product selector no dbe contener icono cuando el tipo es account', async () => {
    
    el.type = 'account';
    el.items = ONE_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('div.products img');

    assert.equal(element.length, 0);
  });

  test('El product selector no dbe contener icono cuando el tipo es card', async () => {
    
    el.type = 'card';
    el.items = ONE_CURRENCY;
    await el.updateComplete;
    const element = el.shadowRoot.querySelectorAll('div.products img');

    assert.isAtLeast(element.length, 1);
  });
});


suite('Verificacion de eventos', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<product-selector></product-selector>`);
    await el.updateComplete;
  });

  test('El product selector debe disparar un evento cuando tiene seleccionado un item desde el atributo', async () => {
    const spy = sinon.spy()
    el.addEventListener('product-selection',spy)
    el.selected = 2
    el.countItems = 1;
    el.renderProducts(ONE_CURRENCY[0].products)

    assert.isTrue(spy.called)
  });

  test('El product selector debe disparar un evento cuando se da click en un producto', async () => {
    const spy = sinon.spy()
    el.addEventListener('product-selection',spy)
    el.items = ONE_CURRENCY;
    await el.updateComplete
    const element = el.shadowRoot.querySelector('input[name="products"]');
    element.dispatchEvent(new Event('click'))

    assert.isTrue(spy.called)
  });

  test('El product selector debe disparar un evento cuando se limpia la selección', async () => {
    const spy = sinon.spy()
    el.addEventListener('clean-selection',spy)
    el.items = ONE_CURRENCY;
    await el.updateComplete
    el.cleanSelection()

    assert.isTrue(spy.called)
  });


  test('El detalle del evento debe coincidor con lo enviado a la funcion sendEvent', async () => {
    const spy = sinon.spy()
    const product = ONE_CURRENCY[0].products[0]
    el.addEventListener('product-selection',spy)

    el.sendEvent('product-selection',product)
    assert.deepEqual(product,spy.args[0][0].detail)
  });

});