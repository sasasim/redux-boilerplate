import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from 'reducers';
import saga from 'sagas';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (isProduction) {
    store = createStore(reducer, applyMiddleware(sagaMiddleware));
  } else {
    const enhancer = applyMiddleware(sagaMiddleware, createLogger());
    store = createStore(reducer,
      window.devToolsExtension
      ? compose(enhancer, window.devToolsExtension())
      : enhancer
    );
  }
  sagaMiddleware.run(saga);
  if (!isProduction && module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
