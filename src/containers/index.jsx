import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Match,
  Miss,
  Link
} from 'react-router';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

import Counter from './CounterContainer';
import HelloUser from './HelloUserContainer';
import NotFound from '../components/NotFound';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as RouterSelectors from '../selectors/routerSelectors';

const Index = ({
  history,
  location,
  action,
  onChangeRoute
}) => (
  <Router
    history={history}
    location={location}
    action={action}
    onChange={onChangeRoute}
  >
    <div>
      <h1>CRAP</h1>
      <nav>
        <Link to="/counter">Counter</Link>&nbsp;|&nbsp;
        <Link to="/hello-user">Hello User</Link>
      </nav>
      <div>
        <Match exactly pattern="/" component={Counter} />
        <Match exactly pattern="/counter" component={Counter} />
        <Match exactly pattern="/hello-user" component={HelloUser} />
        <Miss component={NotFound} />
      </div>
    </div>
  </Router>
);

// We don't need to know exact shape of router stuff
// because it's being consumed by react-router and
// the interface is therefore encapsulated
Index.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  action: PropTypes.string,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChangeRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  history: RouterSelectors.getHistory(state),
  location: RouterSelectors.getLocation(state),
  action: RouterSelectors.getAction(state)
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onChangeRoute: ActionTypes.CHANGE_ROUTE,
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onChangeRoute: (location, action) => dispatchProps.onChangeRoute({ location, action })
  })
)(Index);
