import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import buildAction from 'src/helpers/buildAction';
import * as ActionTypes from 'src/constants/actionTypes';
import * as ApiEffects from 'src/effects/api';
import * as EntityRepositorySaga from 'src/sagas/entityRepositorySaga';
import * as Schema from '../schema';

export function* onSayHello() {
  const user = yield call(ApiEffects.fetchUser);
  const userId = yield call(EntityRepositorySaga.store, user, Schema.UserSchema);
  yield put(buildAction(ActionTypes.USER_FETCHED, userId));
}

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.SAY_HELLO, onSayHello)
  ];
}
