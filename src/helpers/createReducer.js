export default (actionHandlers, initialState) =>
  (state = initialState, { type, payload }) => {
    if (actionHandlers[type]) {
      return actionHandlers[type](state, payload);
    }

    return state;
  };
