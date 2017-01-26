import { connect } from 'react-redux';

import Counter from 'src/components/Counter';
import buildActionCreators from 'src/helpers/buildActionCreators';
import * as ActionTypes from 'src/constants/actionTypes';
import * as CounterSelectors from 'src/selectors/counterSelectors';

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
