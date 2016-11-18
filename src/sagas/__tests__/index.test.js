import { fork } from 'redux-saga/effects';
import rootSaga from 'sagas/';
import helloUserSaga from 'sagas/helloUserSaga';
import routerSaga from 'sagas/routerSaga';

describe('Root Saga', () => {
  it('should fork helloUserSaga and routerSaga', () => {
    const it = rootSaga();

    expect(it.next().value).toEqual([
      fork(helloUserSaga),
      fork(routerSaga)
    ]);
  });
});
