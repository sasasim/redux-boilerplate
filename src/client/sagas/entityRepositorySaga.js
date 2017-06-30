import { put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import buildAction from 'src/client/helpers/buildAction';
import * as ActionTypes from 'src/client/constants/actionTypes';

export function* store(data, schema) {
  const { result, entities } = normalize(data, schema);
  yield put(buildAction(ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED, entities));
  return result;
}
