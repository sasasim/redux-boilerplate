import { actionTypes } from 'redux-router5';
import { fork, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';

import { routerSaga } from 'sagas/routerSaga';

const ROUTE1 = 'ROUTE1';
const ROUTE11 = 'ROUTE1.1';
const ROUTE2 = 'ROUTE2';
const ROUTE21 = 'ROUTE2.1';
const ROUTE3 = 'ROUTE3';

const stub1 = () => {};
const stub11 = () => {};
const stub2 = () => {};
const stub21 = () => {};

describe('Router Saga', () => {
  const setup = () => {
    const it = routerSaga({
      [ROUTE1]: stub1,
      [ROUTE11]: stub11,
      [ROUTE2]: stub2,
      [ROUTE21]: stub21
    });
    expect(it.next().value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    return it;
  };

  it('should go to route1 and then route1.1', () => {
    const it = setup();
    expect(it.next({
      payload: {
        route: {
          name: ROUTE1,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub1));
    const task1 = createMockTask();
    expect(it.next(task1).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    expect(it.next({
      payload: {
        previousRoute: {
          name: ROUTE1,
          meta: { params: {} }
        },
        route: {
          name: ROUTE11,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub11));
    const task11 = createMockTask();
    expect(it.next(task11).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
  });

  it('should go to route1.1 and then route1', () => {
    const it = setup();
    expect(it.next({
      payload: {
        route: {
          name: ROUTE11,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub1));
    const task1 = createMockTask();
    expect(it.next(task1).value).toEqual(fork(stub11));
    const task11 = createMockTask();
    expect(it.next(task11).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    expect(it.next({
      payload: {
        previousRoute: {
          name: ROUTE11,
          meta: { params: {} }
        },
        route: {
          name: ROUTE1,
          meta: { params: {} }
        }
      }
    }).value).toEqual(cancel(task11));
    expect(it.next().value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
  });

  it('should go to route1 and then route2', () => {
    const it = setup();
    expect(it.next({
      payload: {
        route: {
          name: ROUTE1,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub1));
    const task1 = createMockTask();
    expect(it.next(task1).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    expect(it.next({
      payload: {
        previousRoute: {
          name: ROUTE1,
          meta: { params: {} }
        },
        route: {
          name: ROUTE2,
          meta: { params: {} }
        }
      }
    }).value).toEqual(cancel(task1));
    expect(it.next().value).toEqual(fork(stub2));
    const task2 = createMockTask();
    expect(it.next(task2).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
  });

  it('should go to route1.1 and then route2.1', () => {
    const it = setup();
    expect(it.next({
      payload: {
        route: {
          name: ROUTE11,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub1));
    const task1 = createMockTask();
    expect(it.next(task1).value).toEqual(fork(stub11));
    const task11 = createMockTask();
    expect(it.next(task11).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    expect(it.next({
      payload: {
        previousRoute: {
          name: ROUTE11,
          meta: { params: {} }
        },
        route: {
          name: ROUTE21,
          meta: { params: {} }
        }
      }
    }).value).toEqual(cancel(task11));
    expect(it.next().value).toEqual(cancel(task1));
    expect(it.next().value).toEqual(fork(stub2));
    const task2 = createMockTask();
    expect(it.next(task2).value).toEqual(fork(stub21));
    const task21 = createMockTask();
    expect(it.next(task21).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
  });

  it('should go to route without saga', () => {
    const it = setup();
    expect(it.next({
      payload: {
        route: {
          name: ROUTE3,
          meta: { params: {} }
        }
      }
    }).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
    expect(it.next({
      payload: {
        previousRoute: {
          name: ROUTE3,
          meta: { params: {} }
        },
        route: {
          name: ROUTE1,
          meta: { params: {} }
        }
      }
    }).value).toEqual(fork(stub1));
    expect(it.next(createMockTask()).value).toEqual(take(actionTypes.TRANSITION_SUCCESS));
  });
});
