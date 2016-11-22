import buildReducer from 'helpers/buildReducer';
import * as ActionTypes from 'constants/actionTypes';

const initialState = {
  value: 0
};

export default buildReducer({
  [ActionTypes.INCREMENT]: state => ({ ...state, value: state.value + 1 }),
  [ActionTypes.DECREMENT]: state => ({ ...state, value: state.value - 1 }),
}, initialState);
