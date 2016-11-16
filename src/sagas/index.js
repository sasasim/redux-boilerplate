import { fork } from 'redux-saga/effects';

import helloUserSaga from './helloUserSaga';
import routerSaga from './routerSaga';

export default function* () {
  yield [
    fork(helloUserSaga),
    fork(routerSaga)
  ];
}
