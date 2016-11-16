import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import saga from '../sagas';

const isProduction = () => process.env.NODE_ENV === 'production';

const buildStore = (sagaMiddleware) => {
  if (isProduction()) {
    return createStore(
      reducer,
      compose(
        applyMiddleware(
          sagaMiddleware,
        )
      )
    );
  }

  return createStore(
    reducer,
    compose(
      applyMiddleware(
        sagaMiddleware,
          createLogger()
      ),
      window.devToolsExtension ? // eslint-disable-line no-undef
        window.devToolsExtension() : // eslint-disable-line no-undef
        value => value
    )
  );
};

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = buildStore(sagaMiddleware);
  sagaMiddleware.run(saga);

  if (!isProduction() && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
