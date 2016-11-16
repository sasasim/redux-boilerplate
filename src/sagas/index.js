import { fork } from 'redux-saga/effects';

import helloUserSaga from 'sagas/helloUserSaga';
import routerSaga from 'sagas/routerSaga';

export default function* () {
  yield [
    fork(helloUserSaga),
    fork(routerSaga)
  ];
}
