import { merge } from 'lodash';

import buildReducer from 'helpers/buildReducer';
import * as ActionTypes from 'constants/actionTypes';

const initialState = {
  User: {},
  Country: {}
};

export default buildReducer({
  [ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED]: (state, payload) => merge({}, state, payload)
}, initialState);
