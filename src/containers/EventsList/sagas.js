import { take, call, put, select, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { LOAD_EVENTS } from './constants'
import request from 'utils/request'
import { selectAuth } from './selectors'
import { eventsLoaded, eventsLoadingError } from './actions'
export function* getEvents() {
  const { username, password } = yield select(selectAuth())
  const baseURL = ''
  const requestURL = `${baseURL}/api/data/events`
  const events = yield call(request, requestURL)
  if (!events.err) {
    yield put(eventsLoaded(events.data))
  } else {
    yield put(eventsLoadingError(events.err))
  }
}

export function* getEventsWatcher() {
  while (yield take(LOAD_EVENTS)) {
    yield call(getEvents)
  }
}

export function* eventsData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getEventsWatcher)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [
  eventsData,
]
