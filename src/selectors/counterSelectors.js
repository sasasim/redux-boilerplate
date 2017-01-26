import { createSelector } from 'reselect';

import { getCounter as getState } from 'src/selectors/rootSelectors';

export const getValue = createSelector(
  getState,
  state => state.value
);
