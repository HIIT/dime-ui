import { createSelector } from 'reselect';

/**
 * Direct selector to the eventsPage state domain
 */
const selectEventsPageDomain = () => state => state.get('eventsPage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

/**
 * Default selector used by EventsPage
 */

const selectEvents = () => createSelector(
  selectEventsPageDomain(),
  (eventsPage) => eventsPage.get('data').toJS()
);

export default selectEventsPageDomain;
export {
  selectEvents,
  selectAuth,
  selectAPI,
};
