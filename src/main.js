import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import Index from 'containers/RootContainer';
import createRouter from 'router';
import buildStore from 'store';

const router = createRouter();
const store = buildStore(router);

router.start(() => render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <Index />
    </RouterProvider>
  </Provider>,
  document.getElementById('root')
));
