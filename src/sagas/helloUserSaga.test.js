import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import helloUserSaga, { onSayHello } from 'src/sagas/helloUserSaga';
import { store } from 'src/sagas/entityRepositorySaga';
import { fetchUser } from 'src/effects/api';
import * as ActionTypes from 'src/constants/actionTypes';
import { UserSchema } from 'src/schema';
import buildAction from 'src/helpers/buildAction';

describe('Hello User Saga', () => {
  it('should fork takeEvery SAY_HELLO and start onSayHello', () => {
    const it = helloUserSaga();

    expect(it.next().value).toEqual([
      fork(takeEvery, ActionTypes.SAY_HELLO, onSayHello)
    ]);
  });

  describe('onSayHello', () => {
    it('should fetch user and normalize it, then store its reference', () => {
      const it = onSayHello();

      const mockUser = {
        id: 42
      };

      // Fetch
      expect(it.next().value).toEqual(call(fetchUser));

      // Normalize
      expect(it.next(mockUser).value).toEqual(call(store, mockUser, UserSchema));

      // Store reference
      expect(it.next(mockUser.id).value)
        .toEqual(put(buildAction(ActionTypes.USER_FETCHED, mockUser.id)));
    });
  });
});
