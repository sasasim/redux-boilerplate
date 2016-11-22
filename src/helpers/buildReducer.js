export default (actionHandlers, initialState) => {
  const actionKeys = Object.keys(actionHandlers);

  return (state = initialState, { type, payload }) => actionKeys
      .filter(actionType => actionType === type)
      .reduce((currentState, actionType) =>
        actionHandlers[actionType](currentState, payload), state);
};

