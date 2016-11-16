import { createSelector } from 'reselect';

import { getCounter as getState } from 'selectors';

export const getValue = createSelector(
  getState,
  state => state.value
);
