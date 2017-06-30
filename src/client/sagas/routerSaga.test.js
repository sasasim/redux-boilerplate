import { fork, take, cancel } from 'redux-saga/effects';
import { actionTypes } from 'redux-router5';
import { createMockTask } from 'redux-saga/utils';

import { routerSaga } from 'src/client/sagas/routerSaga';

const stub = () => 42;
const STUB_ROUTE = 'STUB_ROUTE';

describe('Router Saga', () => {
  it('should correctly cancel & start corresponding saga on router transition', () => {
    const it = routerSaga({
      [STUB_ROUTE]: stub
    });

    // Wait for transition
    expect(it.next().value).toEqual(take(actionTypes.TRANSITION_SUCCESS));

    // Fork the matched Saga
    expect(it.next({
      payload: {
        route: {
          name: STUB_ROUTE
        }
      }
    }).value).toEqual(fork(stub));

    const task = createMockTask();

    // Wait for next transition
    expect(it.next(task).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));

    // Cancel the forked process
    expect(it.next({
      payload: {
        route: {
          name: STUB_ROUTE
        }
      }
    }).value).toEqual(cancel(task));

    // Fork the saga again
    expect(it.next(task).value).toEqual(fork(stub));
  });
});
