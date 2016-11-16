import { combineReducers } from 'redux';

import counter from 'reducers/counterReducer';
import helloUser from 'reducers/helloUserReducer';
import entityRepository from 'reducers/entityRepositoryReducer';
import router from 'reducers/routerReducer';

export default combineReducers({
  counter,
  helloUser,
  entityRepository,
  router
});
