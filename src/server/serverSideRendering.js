import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';

import buildRouter from 'src/client/router';
import buildStore from 'src/client/store';
import Root from 'src/client/components/Root';

import stats from './stats.json';

const template = (content, js, css) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <link href="${css}" rel="stylesheet">
    </head>
    <body>
      <div id="root">${content}</div>
      <script type="text/javascript" src="${js}"></script>
    </body>
  </html>
`;

export default (req, res, next) => {
  const router = buildRouter();
  const store = buildStore(router);

  router.start(req.originalUrl, (error) => {
    const { router: { route } } = store.getState();

    if (route) {
      res
        .status(200)
        .send(template(renderToString(
          <Provider store={store}>
            <RouterProvider router={router}>
              <Root />
            </RouterProvider>
          </Provider>
        ), stats.js, stats.css));
    } else {
      next();
    }
  });
};
