import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import counter from 'src/client/reducers/counterReducer';
import helloUser from 'src/client/reducers/helloUserReducer';
import entityRepository from 'src/client/reducers/entityRepositoryReducer';

export default combineReducers({
  counter,
  entityRepository,
  helloUser,
  router: router5Reducer
});
