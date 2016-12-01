import counterReducer from 'reducers/counterReducer';
import * as ActionTypes from 'constants/actionTypes';
import buildAction from 'helpers/buildAction';

describe('Counter Reducer', () => {
  it('should increment value on INCREMENT', () => {
    expect(counterReducer(undefined, buildAction(ActionTypes.INCREMENT)).value).toBe(1);
  });

  it('should decrement value on DECREMENT', () => {
    expect(counterReducer(undefined, buildAction(ActionTypes.DECREMENT)).value).toBe(-1);
  });
});
