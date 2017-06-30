import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import buildAction from 'src/client/helpers/buildAction';
import * as ActionTypes from 'src/client/constants/actionTypes';
import * as ApiEffects from 'src/client/effects/api';
import * as EntityRepositorySaga from 'src/client/sagas/entityRepositorySaga';
import * as Schema from 'src/client/schema';

export function* onSayHello() {
  const { data, status } = yield call(ApiEffects.fetchUser);

  if (status === ApiEffects.OK) {
    const userId = yield call(EntityRepositorySaga.store, data, Schema.UserSchema);
    yield put(buildAction(ActionTypes.USER_FETCHED, userId));
  }
}

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.SAY_HELLO, onSayHello)
  ];
}
