import { fork } from 'redux-saga/effects';

import defaultRouterSaga from 'src/sagas/routerSaga';
import usersSaga from 'src/sagas/usersSaga';

export default function* () {
  yield [
    fork(defaultRouterSaga),
    fork(usersSaga)
  ];
}
