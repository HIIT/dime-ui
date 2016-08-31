import { createSelector } from 'reselect';

/**
 * Direct selector to the timelinePage state domain
 */
const timeLinePageDomain = () => state => state.get('timelinePage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

const selectEvents = () => createSelector(
  timeLinePageDomain(),
  (eventsPage) => eventsPage.get('events').toJS()
);

const selectDocuments = () => createSelector(
  timeLinePageDomain(),
  (eventsPage) => eventsPage.get('documents').toJS()
);

const selectLoading = () => createSelector(
  timeLinePageDomain(),
  (documentsPage) => documentsPage.get('loading')
);

const selectError = () => createSelector(
  timeLinePageDomain(),
  (documentsPage) => documentsPage.get('error').toJS()
);

export default timeLinePageDomain;
export {
  selectEvents,
  selectDocuments,
  selectLoading,
  selectError,
  selectAuth,
  selectAPI,
};
