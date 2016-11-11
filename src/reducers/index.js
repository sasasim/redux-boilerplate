import { combineReducers } from 'redux';

import counter from './counterReducer';
import helloUser from './helloUserReducer';
import entityRepository from './entityRepositoryReducer';

export default combineReducers({
  counter,
  helloUser,
  entityRepository
});
