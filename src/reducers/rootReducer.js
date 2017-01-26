import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import counter from 'src/reducers/counterReducer';
import helloUser from 'src/reducers/helloUserReducer';
import entityRepository from 'src/reducers/entityRepositoryReducer';

export default combineReducers({
  counter,
  helloUser,
  entityRepository,
  router: router5Reducer
});
