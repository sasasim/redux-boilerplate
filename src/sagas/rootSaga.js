import { fork } from 'redux-saga/effects';

import defaultRouterSaga from 'src/sagas/routerSaga';

export default function* () {
  yield [
    fork(defaultRouterSaga)
  ];
}
