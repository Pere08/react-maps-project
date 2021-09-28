import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Map from './Map';

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Render button "Mi cuenta"', () => {
  act(() => {
    render(<Map />, container);
  });
  expect(container.querySelector("[data-testid='title']").textContent).toBe('Cuenta');
});
