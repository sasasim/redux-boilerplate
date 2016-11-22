import { fork } from 'redux-saga/effects';

import helloUserSaga from 'sagas/helloUserSaga';

export default function* () {
  yield [
    fork(helloUserSaga)
  ];
}
