import { actionTypes } from 'redux-router5';
import { call, take, cancel, fork } from 'redux-saga/effects';
import transitionPath from 'router5.transition-path';

import helloUserSaga from 'sagas/helloUserSaga';
import * as Routes from 'constants/routes';

export function* routerSaga(routingMap) {
  const routeTasks = {};
  while (true) {
    const { payload: { previousRoute, route } } = yield take(actionTypes.TRANSITION_SUCCESS);
    const { toActivate, toDeactivate } = transitionPath(route, previousRoute);
    for (const name of toDeactivate) {
      const task = routeTasks[name];
      if (task) {
        yield cancel(task);
        delete routeTasks[name];
      }
    }
    for (const name of toActivate) {
      const enteredSaga = routingMap[name];
      if (enteredSaga) {
        routeTasks[name] = yield fork(enteredSaga);
      }
    }
  }
}

export default function* () {
  yield call(routerSaga, {
    [Routes.HELLO_USER]: helloUserSaga
  });
}
