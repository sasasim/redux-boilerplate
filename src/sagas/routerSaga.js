import { put, fork } from 'redux-saga/effects';
import createBrowserHistory from 'history/createBrowserHistory';

import buildAction from 'helpers/buildAction';
import * as ActionTypes from 'constants/actionTypes';

export function* init() {
  const history = createBrowserHistory();

  yield put(buildAction(ActionTypes.ROUTER_INIT, {
    location: history.location,
    action: history.action,
    history
  }));
}

export default function* () {
  yield fork(init);
}
