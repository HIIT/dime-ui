import { createSelector } from 'reselect';

/**
 * Direct selector to the documentsPage state domain
 */
const selectDocumentsPageDomain = () => state => state.get('documentsPage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

/**
 * Default selector used by DocumentsPage
 */

const selectDocuments = () => createSelector(
  selectDocumentsPageDomain(),
  (documentsPage) => documentsPage.get('data').toJS()
);

const selectLoading = () => createSelector(
  selectDocumentsPageDomain(),
  (documentsPage) => documentsPage.get('loading')
);

const selectError = () => createSelector(
  selectDocumentsPageDomain(),
  (documentsPage) => documentsPage.get('error').toJS()
);


export default selectDocumentsPageDomain;
export {
  selectDocuments,
  selectLoading,
  selectError,
  selectAuth,
  selectAPI,
};
