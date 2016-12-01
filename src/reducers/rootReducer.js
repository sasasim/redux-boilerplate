import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import counter from 'reducers/counterReducer';
import helloUser from 'reducers/helloUserReducer';
import entityRepository from 'reducers/entityRepositoryReducer';

export default combineReducers({
  counter,
  helloUser,
  entityRepository,
  router: router5Reducer
});
