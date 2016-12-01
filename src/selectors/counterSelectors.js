import { createSelector } from 'reselect';

import { getCounter as getState } from 'selectors/rootSelectors';

export const getValue = createSelector(
  getState,
  state => state.value
);
