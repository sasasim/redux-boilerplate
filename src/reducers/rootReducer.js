import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import counter from 'src/reducers/counterReducer';
import helloUser from 'src/reducers/helloUserReducer';
import entityRepository from 'src/reducers/entityRepositoryReducer';
import users from 'src/reducers/usersReducer';

export default combineReducers({
  counter,
  entityRepository,
  helloUser,
  router: router5Reducer,
  users
});
