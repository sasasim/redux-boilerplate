import counterReducer from 'src/reducers/counterReducer';
import * as ActionTypes from 'src/constants/actionTypes';
import buildAction from 'src/helpers/buildAction';

describe('Counter Reducer', () => {
  it('should increment value on INCREMENT', () => {
    expect(counterReducer(undefined, buildAction(ActionTypes.INCREMENT)).value).toBe(1);
  });

  it('should decrement value on DECREMENT', () => {
    expect(counterReducer(undefined, buildAction(ActionTypes.DECREMENT)).value).toBe(-1);
  });
});
