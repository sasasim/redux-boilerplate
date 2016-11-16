import { combineReducers } from 'redux';

import counter from './counterReducer';
import helloUser from './helloUserReducer';
import entityRepository from './entityRepositoryReducer';
import router from './routerReducer';

export default combineReducers({
  counter,
  helloUser,
  entityRepository,
  router
});
