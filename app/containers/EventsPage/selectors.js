import { createSelector } from 'reselect';

/**
 * Direct selector to the eventsPage state domain
 */
const selectEventsPageDomain = () => state => state.get('eventsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EventsPage
 */

const selectEventsPage = () => createSelector(
  selectEventsPageDomain(),
  (substate) => substate.toJS()
);

export default selectEventsPage;
export {
  selectEventsPageDomain,
};
