import { createSelector } from 'reselect';

import { getHelloUser as getState } from 'src/client/selectors/rootSelectors';
import * as EntityRepositorySelectors from 'src/client/selectors/entityRepositorySelectors';

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
