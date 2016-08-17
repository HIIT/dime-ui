import { createSelector } from 'reselect';

/**
 * Direct selector to the eventsList state domain
 */
const selectEventsListDomain = () => state => state.get('eventsList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EventsList
 */

const selectEventsList = () => createSelector(
  selectEventsListDomain(),
  (substate) => substate.toJS()
);

export default selectEventsList;
export {
  selectEventsListDomain,
};
