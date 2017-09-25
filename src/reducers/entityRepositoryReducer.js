import { merge } from 'lodash';

import createReducer from 'src/helpers/createReducer';
import * as ActionTypes from 'src/constants/actionTypes';

const initialState = {
  Country: {},
  User: {}
};

export default createReducer({
  [ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED]: (state, payload) => merge({}, state, payload)
}, initialState);
