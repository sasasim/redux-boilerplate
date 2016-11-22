import createReducer from 'helpers/createReducer';
import * as ActionTypes from 'constants/actionTypes';

const initialState = {};

export default createReducer({
  [ActionTypes.ROUTER_INIT]: (state, { location, action, history }) => ({
    ...state,
    location,
    action,
    history
  }),
  [ActionTypes.CHANGE_ROUTE]: (state, { location, action }) => ({
    ...state,
    location,
    action
  })
}, initialState);
