import { connect } from 'react-redux';

import HelloUser from 'src/components/HelloUser';
import buildActionCreators from 'src/helpers/buildActionCreators';
import * as ActionTypes from 'src/constants/actionTypes';
import * as HelloUserSelectors from 'src/selectors/helloUserSelectors';

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
