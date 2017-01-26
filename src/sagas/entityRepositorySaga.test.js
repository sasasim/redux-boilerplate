import { put } from 'redux-saga/effects';
import { schema } from 'normalizr';

import { store } from 'src/sagas/entityRepositorySaga';
import buildAction from 'src/helpers/buildAction';
import * as ActionTypes from 'src/constants/actionTypes';

const UserSchema = new schema.Entity('User');
const CompanySchema = new schema.Entity('Company');

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
