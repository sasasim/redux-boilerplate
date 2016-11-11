import { createSelector } from 'reselect';

import { getCounter as getState } from './';

export const getValue = createSelector(
  getState,
  state => state.value
);
