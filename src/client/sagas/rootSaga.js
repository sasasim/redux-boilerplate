import { fork } from 'redux-saga/effects';

import defaultRouterSaga from 'src/client/sagas/routerSaga';

export default function* () {
  yield [
    fork(defaultRouterSaga)
  ];
}
