import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

import * as Routes from 'constants/routes';

const routes = [{
  name: Routes.INDEX,
  path: '/'
}, {
  name: Routes.COUNTER,
  path: '/counter'
}, {
  name: Routes.HELLO_USER,
  path: '/hello-user'
}];

export default () =>
  createRouter(routes, {
    defaultRoute: 'index'
  })
    .usePlugin(browserPlugin())
    .usePlugin(listenersPlugin());
