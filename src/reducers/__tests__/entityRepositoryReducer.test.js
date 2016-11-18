import entityRepositoryReducer from 'reducers/entityRepositoryReducer';
import * as ActionTypes from 'constants/actionTypes';
import buildAction from 'helpers/buildAction';

describe('Counter Reducer', () => {
  it('should merge entity repository on ENTITY_REPOSITORY_HAS_CHANGED', () => {
    const initialState = {
      USER: {
        23: {
          name: 'John',
          lastName: 'Doe'
        }
      }
    };

    expect(entityRepositoryReducer(initialState,
      buildAction(ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED, {
        USER: {
          23: {
            foo: true,
            lastName: 'Spicy'
          }
        }
      }))).toEqual({
        USER: {
          23: {
            name: 'John',
            lastName: 'Spicy',
            foo: true
          }
        }
      });
  });
});
