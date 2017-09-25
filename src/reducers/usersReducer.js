import createReducer from 'src/helpers/createReducer';
import * as ActionTypes from 'src/constants/actionTypes';
import * as Phase from 'src/constants/phase';

const initialState = {
  phase: Phase.INIT, 
  error: null,
  data: null
};

export default createReducer({
  [ActionTypes.FETCH_USERS]: state => ({ ...state, phase: Phase.LOADING }),
  [ActionTypes.FETCH_USERS_SUCCESS]: (state, users) => ({ ...state, data: users, phase: Phase.SUCCESS }),
  [ActionTypes.FETCH_USERS_ERROR]: (state, error) => ({ ...state, phase: Phase.ERROR, error }),
}, initialState);
