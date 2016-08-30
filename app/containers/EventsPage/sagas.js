import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_EVENTS, SEARCH_EVENTS, CLICK_EVENT_TAG, CLICK_EVENT_CARD, DELETE_EVENT } from './constants';
import request from 'utils/request';
import { selectAuth, selectAPI } from './selectors';
import {
  eventsLoaded,
  eventsLoadingError,
  searchEventLoaded,
  searchEventError,
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
    yield put(eventsLoadingError(respond));
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

// Search Sage

export function* searchEvent(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const { keyword } = action;
  const requestURL = keyword.length > 0 ? `http://${url}/api/eventsearch?query=${keyword}` : `http://${url}/api/data/events`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(searchEventLoaded(keyword.length > 0 ? respond.data.docs : respond.data));
  } else {
    yield put(searchEventError(respond));
  }
}

export function* searchWatcher() {
  yield* takeLatest(SEARCH_EVENTS, searchEvent);
}

export function* searchData() {
  const searchWatcherFork = yield fork(searchWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(searchWatcherFork);
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
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/event/${action.eventID}/`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(deleteEventSucess(respond.data, action.eventID));
  } else {
    yield put(deleteEventError(respond, action.eventID));
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
  const removeTagRequestURL = `http://${url}/api/data/informationelement/${eventID}/removetag`;
  const removeTagRequestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  };
  const addTagRequestURL = `http://${url}/api/data/informationelement/${eventID}/addtag`;
  const addTagRequestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      '@type': 'Tag',
      text: tag.text,
      auto: !tag.auto,
      actor: 'dime-ui',
      time: new Date().toISOString(),
    }),
  };
  const removeTagRespond = yield call(request, removeTagRequestURL, removeTagRequestOptions);
  if (!removeTagRespond.err) {
    const addTagRespond = yield call(request, addTagRequestURL, addTagRequestOptions);
    if (!addTagRespond.err) {
      yield put(toogleEventTagScuess(addTagRespond.data, tag));
    } else {
      yield put(toogleEventTagError(addTagRespond.err));
    }
  } else {
    yield put(toogleEventTagError(removeTagRespond.err));
  }
}

export function* clickTagWatcher() {
  yield* takeEvery(CLICK_EVENT_TAG, toogleEventTagAutoLabel);
}

// All sagas to be loaded
export default [
  eventsData,
  searchData,
  clickEventWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
];
