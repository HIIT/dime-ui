import { createSelector } from 'reselect';

/**
 * Direct selector to the linkContractsPage state domain
 */
const selectLinkContractsPageDomain = () => state => state.get('linkContractsPage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

/**
 * Default selector used by LinkContractsPage
 */

const selectLinkContractRequests = () => createSelector(
  selectLinkContractsPageDomain(),
  (linkContractsPage) => linkContractsPage.get('linkContractRequests').toJS()
);

const selectLinkContracts = () => createSelector(
  selectLinkContractsPageDomain(),
  (linkContractsPage) => linkContractsPage.get('linkContracts').toJS()
);

const selectLoading = () => createSelector(
  selectLinkContractsPageDomain(),
  (linkContractsPage) => linkContractsPage.get('loading')
);

const selectError = () => createSelector(
  selectLinkContractsPageDomain(),
  (linkContractsPage) => linkContractsPage.get('error').toJS()
);

const selectProfiles = () => createSelector(
  selectLinkContractsPageDomain(),
  (linkContractsPage) => linkContractsPage.get('profiles').toJS()
);

export default selectLinkContractsPageDomain;
export {
  selectLinkContractRequests,
  selectLinkContracts,
  selectLoading,
  selectError,
  selectAuth,
  selectAPI,
  selectProfiles,
};
