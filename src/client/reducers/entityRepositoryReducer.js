import merge from 'lodash/merge';

import createReducer from 'src/client/helpers/createReducer';
import * as ActionTypes from 'src/client/constants/actionTypes';

const initialState = {
  Country: {},
  User: {}
};

export default createReducer({
  [ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED]: (state, payload) => merge({}, state, payload)
}, initialState);
