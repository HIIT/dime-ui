import { createSelector } from 'reselect';

/**
 * Direct selector to the eventsList state domain
 */
const selectEventsListDomain = () => state => state.get('eventsList');

/**
 * Other specific selectors
 */

const selectEventsListData = () => createSelector(
  selectEventsListDomain(),
  (eventsListState) => eventsListState.get('data').toJS()
);

const selectAuth = () => (state) => state.get('auth').toJS();

/**
 * Default selector used by EventsList
 */

export default selectEventsListDomain;
export {
  selectEventsListDomain,
  selectEventsListData,
  selectAuth,
};
