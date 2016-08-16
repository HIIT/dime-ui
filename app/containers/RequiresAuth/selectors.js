import { createSelector } from 'reselect';

/**
 * Direct selector to the requiresAuth state domain
 */
const selectAuthDomain = () => state => state.get('auth');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RequiresAuth
 */

const selectRequiresAuth = () => createSelector(
  selectAuthDomain(),
  (substate) => substate.toJS()
);

export default selectRequiresAuth;
export {
  selectAuthDomain,
};
