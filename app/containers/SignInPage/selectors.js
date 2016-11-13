import { createSelector } from 'reselect';

/**
 * Direct selector to the signInPage state domain
 */
const selectSignInPageDomain = () => state => state.get('signInPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignInPage
 */

const selectSignInPage = () => createSelector(
  selectSignInPageDomain(),
  (substate) => substate.toJS()
);

export default selectSignInPage;
export {
  selectSignInPageDomain,
};
