import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Phase from 'src/constants/phase';

import buildActionCreators from 'src/helpers/buildActionCreators';
import * as ActionTypes from 'src/constants/actionTypes';
import * as CounterSelectors from 'src/selectors/counterSelectors';

import 'styles/counter.styl';

const Counter = ({ 
  value, 
  onDecrement, 
  onIncrement,
  onFetchUsers ,
  users,
  usersLoaded,
}) => (
  <div className="counter">
    <button onClick={onDecrement}>-</button>
    <span>{value}</span>
    <button onClick={onIncrement}>+</button>
    <button onClick={onFetchUsers}>Fetch Users</button>
    { usersLoaded && (<div>
      {users.map((user) => (<div key={user.id}>
        <div>ID:{user.id}</div>
        <div>Name:{user.name}</div>
      </div>))}
      </div>)
    }
  </div>
);

Counter.propTypes = {
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onFetchUsers: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

const mapStateToProps = state =>{
  console.info('Users:', state.users.data);
  return {
    value: CounterSelectors.getValue(state),
    users: state.users.data,
    usersLoaded: state.users.phase === Phase.SUCCESS
  };
};

export default connect(
  mapStateToProps,
  buildActionCreators({
    onDecrement: ActionTypes.DECREMENT,
    onIncrement: ActionTypes.INCREMENT,
    onFetchUsers: ActionTypes.FETCH_USERS
  })
)(Counter);
