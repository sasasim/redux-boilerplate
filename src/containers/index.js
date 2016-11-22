import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { startsWithSegment } from 'router5.helpers';

import Counter from 'containers/CounterContainer';
import HelloUser from 'containers/HelloUserContainer';
import Link from 'components/Link';
import NotFound from 'components/NotFound';
import * as Routes from 'constants/routes';

const renderContent = (testRoute) => {
  if (testRoute(Routes.COUNTER) || testRoute(Routes.INDEX)) {
    return <Counter />;
  } else if (testRoute(Routes.HELLO_USER)) {
    return <HelloUser />;
  }

  return <NotFound />;
};

const Index = ({ route: { name } }) => {
  const testRoute = startsWithSegment(name);

  return (
    <div>
      <h1>redux-boilerplate</h1>
      <nav>
        <Link name={Routes.COUNTER}>Counter</Link>&nbsp;|&nbsp;
        <Link name={Routes.HELLO_USER}>Hello User</Link>
      </nav>
      <div>
        {renderContent(testRoute)}
      </div>
    </div>
  );
};

Index.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ...routeNodeSelector()(state)
});

export default connect(
  mapStateToProps
)(Index);
