import { createSelector } from 'reselect';

import { getHelloUser as getState } from 'src/selectors/rootSelectors';
import * as EntityRepositorySelectors from 'src/selectors/entityRepositorySelectors';

export const isGreeted = createSelector(
  getState,
  state => state.greeted
);

export const getUser = createSelector(
  getState,
  EntityRepositorySelectors.getUsers,
  (state, users) => {
    if (state.user) {
      return users[state.user];
    }

    return null;
  }
);
