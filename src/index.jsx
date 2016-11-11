import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Index from './containers';
import buildStore from './store';

const store = buildStore();

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
