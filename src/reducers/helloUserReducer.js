import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  greeted: false,
  user: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SAY_HELLO:
      return {
        ...state,
        greeted: true
      };

    case ActionTypes.USER_FETCHED:
      return {
        ...state,
        user: payload
      };

    default:
      return state;
  }
};
