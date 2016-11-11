import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Match,
  Miss,
  Link
} from 'react-router';

import Counter from './CounterContainer';
import HelloUser from './HelloUserContainer';
import NotFound from '../components/NotFound';

const EMPTY_PROPS = {};

const mapStateToProps = () => EMPTY_PROPS;

export default connect(mapStateToProps)(() => (
  <BrowserRouter>
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
  </BrowserRouter>
));
