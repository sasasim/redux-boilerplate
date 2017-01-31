/* global devToolsExtension */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { router5Middleware } from 'redux-router5';

import reducer from 'src/reducers/rootReducer';
import saga from 'src/sagas/rootSaga';
import isProduction from 'src/helpers/isProduction';

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
      sagaMiddleware,
      createLogger()
    );
    if (window.devToolsExtension) {
      enhancer = compose(enhancer, devToolsExtension());
    }
  }
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(saga);
  // if (!isProduction && module.hot) {
  //   module.hot.accept('./reducers/rootReducer', () => {
  //     // eslint-disable-next-line global-require
  //     store.replaceReducer(require('./reducers/rootReducer').default);
  //   });
  // }
  return store;
}
