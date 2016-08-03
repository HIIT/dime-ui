import { createSelector } from 'reselect'

const selectEventsList = () => (state) => state.get('eventsList')

const selectEventsListData = () => createSelector(
  selectEventsList(),
  (eventsListState) => eventsListState.get('data')
)

const selectAuth = () => (state) => state.get('auth')

export {
  selectEventsListData,
  selectAuth
}
