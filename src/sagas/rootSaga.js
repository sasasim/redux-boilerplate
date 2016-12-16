import { fork } from 'redux-saga/effects';

import defaultRouterSaga from 'sagas/routerSaga';

export default function* () {
  yield [
    fork(defaultRouterSaga)
  ];
}
