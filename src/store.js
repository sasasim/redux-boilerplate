/* global devToolsExtension */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from 'reducers';
import saga from 'sagas';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let enhancer;
  if (isProduction) {
    enhancer = applyMiddleware(sagaMiddleware);
  } else {
    enhancer = applyMiddleware(sagaMiddleware, createLogger());
    if (window.devToolsExtension) {
      enhancer = compose(enhancer, devToolsExtension());
    }
  }
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(saga);
  if (!isProduction && module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
