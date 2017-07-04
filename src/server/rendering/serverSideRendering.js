import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import buildRouter from 'src/client/router';
import buildStore from 'src/client/store';
import Root from 'src/client/components/Root';

import template from './template';

export default (req, res) => {
  const router = buildRouter();
  const store = buildStore(router);

  router.start(req.originalUrl, (error) => {
    const { router: { route } } = store.getState();

    let status;
    if (error) {
      status = 500;
    } else if (!route) {
      status = 404;
    } else {
      status = 200;
    }

    res
      .status(status)
      .send(template(renderToString(
        <Provider store={store}>
          <RouterProvider router={router}>
            <Root />
          </RouterProvider>
        </Provider>
      )));
  });
};
