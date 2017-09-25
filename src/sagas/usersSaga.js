import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import buildAction from 'src/helpers/buildAction';
import * as ActionTypes from 'src/constants/actionTypes';
import * as ApiEffects from 'src/effects/api';
import * as EntityRepositorySaga from 'src/sagas/entityRepositorySaga';
import * as Schema from '../schema';

export function* onFetchUsers() {
  try {
      const users = yield call(ApiEffects.fetchUsers, null);
      console.info('Users:', users)
      yield put(buildAction(ActionTypes.FETCH_USERS_SUCCESS, users));
  } catch (e) {
      yield put(buildAction(ActionTypes.FETCH_USERS_ERROR, e));
      return;
  }  
}

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.FETCH_USERS, onFetchUsers)
  ];
}
