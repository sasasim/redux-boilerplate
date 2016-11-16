import { createSelector } from 'reselect';

import { getRouter as getState } from './';

export const getHistory = createSelector(
  getState,
  state => state && state.history
);

export const getLocation = createSelector(
  getState,
  state => state && state.location
);

export const getAction = createSelector(
  getState,
  state => state && state.action
);
