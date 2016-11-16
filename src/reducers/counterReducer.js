import * as ActionTypes from 'constants/actionTypes';

const initialState = {
  value: 0
};

export default (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.INCREMENT:
      return { ...state, value: state.value + 1 };

    case ActionTypes.DECREMENT:
      return { ...state, value: state.value - 1 };

    default:
      return state;
  }
};
