import createReducer from 'src/client/helpers/createReducer';
import * as ActionTypes from 'src/client/constants/actionTypes';

const initialState = {
  value: 0
};

export default createReducer({
  [ActionTypes.INCREMENT]: state => ({ ...state, value: state.value + 1 }),
  [ActionTypes.DECREMENT]: state => ({ ...state, value: state.value - 1 }),
}, initialState);
