import entityRepositoryReducer from 'src/reducers/entityRepositoryReducer';
import * as ActionTypes from 'src/constants/actionTypes';
import buildAction from 'src/helpers/buildAction';

describe('Counter Reducer', () => {
  it('should merge entity repository on ENTITY_REPOSITORY_HAS_CHANGED', () => {
    const initialState = {
      USER: {
        23: {
          lastName: 'Doe',
          name: 'John'
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
            foo: true,
            lastName: 'Spicy',
            name: 'John'
          }
        }
      });
  });
});
