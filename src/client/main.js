import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import Index from 'src/client/components/Root';
import createRouter from 'src/client/router';
import buildStore from 'src/client/store';

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
