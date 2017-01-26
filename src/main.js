import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import Index from 'src/containers/RootContainer';
import createRouter from 'src/router';
import buildStore from 'src/store';

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
