import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import buildActionCreators from 'src/client/helpers/buildActionCreators';
import * as ActionTypes from 'src/client/constants/actionTypes';
import * as HelloUserSelectors from 'src/client/selectors/helloUserSelectors';

const HelloUser = ({ greeted, user, onSayHello }) => (
  <div>
    {!greeted && <button onClick={onSayHello}>Say Hello!</button>}
    {greeted && user && <h1>Hello {user.firstName} {user.lastName} from {user.country.name}</h1>}
  </div>
);

HelloUser.propTypes = {
  greeted: PropTypes.bool.isRequired,
  onSayHello: PropTypes.func.isRequired,
  user: PropTypes.shape({
    country: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  greeted: HelloUserSelectors.isGreeted(state),
  user: HelloUserSelectors.getUser(state)
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onSayHello: ActionTypes.SAY_HELLO
  })
)(HelloUser);
