export default (actionHandlers, initialState) =>
  (state = initialState, { type, payload }) => Object.keys(actionHandlers)
      .filter(actionType => actionType === type)
      .reduce((currentState, actionType) =>
        actionHandlers[actionType](currentState, payload), state);
