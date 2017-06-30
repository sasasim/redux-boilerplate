import { createSelector } from 'reselect';

import { getCounter as getState } from 'src/client/selectors/rootSelectors';

export const getValue = createSelector(
  getState,
  state => state.value
);
