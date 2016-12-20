import { fork, take, cancel } from 'redux-saga/effects';
import { routerSaga } from 'sagas/routerSaga';
import { actionTypes } from 'redux-router5';
import { createMockTask } from 'redux-saga/utils';

const stub = () => 42;
const stub2 = () => 42;
const STUB_ROUTE = 'STUB_ROUTE';
const NESTED_ROUTE = 'NESTED_ROUTE';
const NESTED_ROUTE_1 = 'NESTED_ROUTE.R1';

describe('Router Saga', () => {
  it('should correctly cancel & start corresponding saga on router transition', () => {
    const it = routerSaga({
      [STUB_ROUTE]: stub,
      [NESTED_ROUTE]: stub2, //saga declared for parent route
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
          name: NESTED_ROUTE_1
        }
      }
    }).value).toEqual(cancel(task));

    // Fork the all parent sagas
    expect(it.next(task).value).toEqual(fork(stub2));
  });
});
