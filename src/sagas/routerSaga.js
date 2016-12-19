import _ from 'lodash';
import { call, take, cancel, fork } from 'redux-saga/effects';
import { startsWithSegment } from 'router5.helpers';
import { actionTypes } from 'redux-router5';

import helloUserSaga from 'sagas/helloUserSaga';
import * as Routes from 'constants/routes';

export function* routerSaga(routingMap) {
  const sagaTasks = {};

  while (true) {
    const { payload: { route: name } } = yield take(actionTypes.TRANSITION_SUCCESS);

    const matchedRoutes = Object
      .keys(routingMap)
      .filter(routeName => startsWithSegment(name, routeName));
    const activatedRoutes = Object.keys(sagaTasks);
    const exitedRoutes = _.difference(activatedRoutes, matchedRoutes);
    const enteredRoutes = _.difference(matchedRoutes, activatedRoutes);

    for (const exited of exitedRoutes) {
      const saga = sagaTasks[exited];
      if (saga) {
        yield cancel(saga);
        delete sagaTasks[exited];
      }
    }

    for (const entered of enteredRoutes) {
      const enteredSaga = routingMap[entered];
      sagaTasks[entered] = yield fork(enteredSaga);
    }
  }
}

export default function* () {
  yield call(routerSaga, {
    [Routes.HELLO_USER]: helloUserSaga
  });
}
