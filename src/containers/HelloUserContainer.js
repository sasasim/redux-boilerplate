import { connect } from 'react-redux';

import HelloUser from '../components/HelloUser';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as HelloUserSelectors from '../selectors/helloUserSelectors';

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
