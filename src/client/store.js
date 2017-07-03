/* global devToolsExtension */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { router5Middleware } from 'redux-router5';

import reducer from 'src/client/reducers/rootReducer';
import saga from 'src/client/sagas/rootSaga';
import isProduction from 'src/client/helpers/isProduction';

export default function configureStore(router) {
  const sagaMiddleware = createSagaMiddleware();

  let enhancer;
  if (isProduction) {
    enhancer = applyMiddleware(
      router5Middleware(router),
      sagaMiddleware
    );
  } else {
    enhancer = applyMiddleware(
      router5Middleware(router),
      sagaMiddleware
    );
    if (process.env.RUNTIME_ENV === 'client' && window.devToolsExtension) {
      enhancer = compose(enhancer, devToolsExtension());
    }
  }
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(saga);
  if (!isProduction && module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers/rootReducer').default);
    });
  }
  return store;
}
