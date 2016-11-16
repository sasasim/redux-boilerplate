import * as ActionTypes from 'constants/actionTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ROUTER_INIT:
      return {
        ...state,
        location: payload.location,
        action: payload.action,
        history: payload.history
      };

    case ActionTypes.CHANGE_ROUTE:
      return {
        ...state,
        location: payload.location,
        action: payload.action,
      };

    default:
      return state;
  }
};
