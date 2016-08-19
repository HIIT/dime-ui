import { take, call, put, select, fork, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_EVENTS } from './constants';
import request from 'utils/request';
import { selectAuth } from './selectors';
import { eventsLoaded, eventsLoadingError } from './actions';

export function* getEvents() {
  const { username, password } = yield select(selectAuth());
  const base64Toekn = window.btoa(`${username}:${password}`);
  const requestURL = `http://${window.location.hostname}:${window.location.port}$/api/data/events`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${base64Toekn}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(eventsLoaded(respond.data));
  } else {
    yield put(eventsLoadingError(respond.err));
  }
}

export function* getEventsWatcher() {
  yield* takeLatest(LOAD_EVENTS, getEvents);
}

export function* eventsData() {
  const watcher = yield fork(getEventsWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  eventsData,
];
