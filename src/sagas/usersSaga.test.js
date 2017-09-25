import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import { actionTypes } from 'redux-router5';
import * as ActionTypes from 'src/constants/actionTypes';
import * as ApiEffects from 'src/effects/api';
import { createMockTask } from 'redux-saga/utils';
import buildAction from 'src/helpers/buildAction';
import usersSaga, { onFetchUsers } from 'src/sagas/usersSaga';

describe('Users Saga', () => {
  it('should fork takeEvery FETCH_USERS and start onFetchUsers', () => {
    const it = usersSaga();

    expect(it.next().value).toEqual([
      fork(takeEvery, ActionTypes.FETCH_USERS, onFetchUsers)
    ]);
  });

  describe('onFetchUsers', () => {
    it('', () => {
      const it = onFetchUsers();

      const mockUsers = [{
        id: 1
      },
      {
        id: 2
      }];

      // Fetch
      expect(it.next().value).toEqual(call(ApiEffects.fetchUsers, null));

      // // Store reference
      expect(it.next(mockUsers).value)
        .toEqual(put(buildAction(ActionTypes.FETCH_USERS_SUCCESS, mockUsers)));
    });
  });
});
