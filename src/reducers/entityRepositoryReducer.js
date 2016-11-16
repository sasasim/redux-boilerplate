import { merge } from 'lodash';

import * as ActionTypes from 'constants/actionTypes';

const initialState = {
  User: {},
  Country: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED:
      return merge({}, state, payload);

    default:
      return state;
  }
};
