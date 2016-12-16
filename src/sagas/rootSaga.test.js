import { fork } from 'redux-saga/effects';
import rootSaga from 'sagas/rootSaga';
import defaultRouterSaga from 'sagas/routerSaga';

describe('Root Saga', () => {
  it('should fork routerSaga', () => {
    const it = rootSaga();

    expect(it.next().value).toEqual([
      fork(defaultRouterSaga)
    ]);
  });
});
