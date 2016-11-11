import { connect } from 'react-redux';

import Counter from '../components/Counter';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as CounterSelectors from '../selectors/counterSelectors';

const mapStateToProps = state => ({
  value: CounterSelectors.getValue(state)
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onIncrement: ActionTypes.INCREMENT,
    onDecrement: ActionTypes.DECREMENT
  })
)(Counter);
