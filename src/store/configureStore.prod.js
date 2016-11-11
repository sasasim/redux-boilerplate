import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import saga from '../sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        sagaMiddleware,
      )
    )
  );

  sagaMiddleware.run(saga);

  return store;
}
