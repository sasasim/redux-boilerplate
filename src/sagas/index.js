import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import * as HelloUserSaga from './helloUserSaga';
import * as ActionTypes from '../constants/actionTypes';

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.SAY_HELLO, HelloUserSaga.onSayHello)
  ];
}
