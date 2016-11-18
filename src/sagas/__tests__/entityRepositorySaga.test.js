import { put } from 'redux-saga/effects';
import { Schema } from 'normalizr';
import { store } from 'sagas/entityRepositorySaga';
import buildAction from 'helpers/buildAction';
import * as ActionTypes from 'constants/actionTypes';

const UserSchema = new Schema('User');
const CompanySchema = new Schema('Company');

UserSchema.define({
  company: CompanySchema
});

const mockUser = {
  id: 42,
  company: {
    id: 2,
    name: 'foobar'
  }
};

describe('Entity Repository Saga', () => {
  describe('store', () => {
    it('should return entity id', () => {
      const it = store(mockUser, UserSchema);
      it.next();
      expect(it.next().value).toBe(42);
    });

    it('should dispatch ENTITY_REPOSITORY_HAS_CHANGED with normalized entities', () => {
      const it = store(mockUser, UserSchema);
      expect(it.next().value).toEqual(
        put(buildAction(
          ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED,
          {
            User: {
              42: {
                id: 42,
                company: 2
              }
            },
            Company: {
              2: {
                id: 2,
                name: 'foobar'
              }
            }
          }
        )));
    });
  });
});
