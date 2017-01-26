import { fork } from 'redux-saga/effects';

import rootSaga from 'src/sagas/rootSaga';
import defaultRouterSaga from 'src/sagas/routerSaga';

describe('Root Saga', () => {
  it('should fork routerSaga', () => {
    const it = rootSaga();

    expect(it.next().value).toEqual([
      fork(defaultRouterSaga)
    ]);
  });
});
