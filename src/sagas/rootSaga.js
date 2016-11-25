import { fork } from 'redux-saga/effects';

import routerSaga from 'sagas/routerSaga';

export default function* () {
  yield [
    fork(routerSaga)
  ];
}
