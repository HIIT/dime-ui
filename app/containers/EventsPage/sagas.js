import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_EVENTS, CLICK_EVENT_TAG, CLICK_EVENT_CARD, DELETE_EVENT } from './constants';
import request from 'utils/request';
import merge from 'lodash/merge';
import { selectAuth, selectAPI } from './selectors';
import {
  eventsLoaded,
  eventsLoadingError,
  deleteEventSucess,
  deleteEventError,
  toogleEventTagScuess,
  toogleEventTagError,
} from './actions';

// Init EventList Sage (Load Event Sage)

export function* getEvents() {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/events`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
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
  const getEventsWatcherFork = yield fork(getEventsWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(getEventsWatcherFork);
}

// Click Event Card Saga

export function* clickEvent({ event }) {
  put({ type: 'SET_MODAL_OPEN', payload: event });
}

export function* clickEventWatcher() {
  yield* takeLatest(CLICK_EVENT_CARD, clickEvent);
}

export function* clickEventWatcherPlusLocationChangeCanceler() {
  const watcher = yield fork(clickEventWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Delete Event Card Saga

export function* deleteEvent(action) {
  const { id } = action.event;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/event/${id}/`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(deleteEventSucess(respond.data));
  } else {
    yield put(deleteEventError(respond.err));
  }
}

export function* deleteEntityWatcher() {
  yield* takeEvery(DELETE_EVENT, deleteEvent);
}

// Click Event Tag Saga

export function* toogleEventTagAutoLabel(action) {
  const { tag, eventID } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/event/${eventID}/addtag`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify(merge(tag, {
      auto: !tag.auto,
      actor: 'dime-ui',
      time: new Date().toISOString(),
    })),
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(toogleEventTagScuess(respond.data));
  } else {
    yield put(toogleEventTagError(respond.err));
  }
}

export function* clickTagWatcher() {
  yield* takeEvery(CLICK_EVENT_TAG, toogleEventTagAutoLabel);
}

// All sagas to be loaded
export default [
  eventsData,
  clickEventWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
];
