import { createSelector } from 'reselect';

import { getEntityRepository as getState } from 'src/client/selectors/rootSelectors';

export const getCountries = createSelector(
  getState,
  state => state.Country
);

export const getUsers = createSelector(
  getState,
  getCountries,
  (state, countries) => Object
    .keys(state.User)
    .reduce((memo, userId) => ({
      ...memo,
      [userId]: {
        ...state.User[userId],
        country: countries[state.User[userId].country]
      }
    }), {})
);
