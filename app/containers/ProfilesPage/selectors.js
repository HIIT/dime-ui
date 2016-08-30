import { createSelector } from 'reselect';

/**
 * Direct selector to the profilesPage state domain
 */
const selectProfilesPageDomain = () => state => state.get('profilesPage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

/**
 * Default selector used by ProfilesPage
 */

const selectProfiles = () => createSelector(
  selectProfilesPageDomain(),
  (profilesPage) => profilesPage.get('data').toJS()
);

const selectLoading = () => createSelector(
  selectProfilesPageDomain(),
  (profilesPage) => profilesPage.get('loading')
);

const selectError = () => createSelector(
  selectProfilesPageDomain(),
  (profilesPage) => profilesPage.get('error').toJS()
);


export default selectProfilesPageDomain;
export {
  selectProfiles,
  selectLoading,
  selectError,
  selectAuth,
  selectAPI,
};
