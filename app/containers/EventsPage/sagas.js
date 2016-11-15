import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_EVENTS, SEARCH_EVENTS, CLICK_EVENT_TAG, CLICK_EVENT_CARD, DELETE_EVENT,
  LOAD_PROFILES, ADD_EVENT_TO_PROFILE,
 } from './constants';
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
  profilesLoaded,
  profilesLoadingError,
  addEventToProfileSucess,
  addEventToProfileError,
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
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(eventsLoaded(respond));
    }
  } catch (error) {
    yield put(eventsLoadingError(error));
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
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(searchEventLoaded(keyword.length > 0 ? respond.docs : respond));
    }
  } catch (error) {
    yield put(searchEventError(error));
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
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(deleteEventSucess(respond, action.eventID));
    }
  } catch (error) {
    yield put(deleteEventError(error, action.eventID));
  }
}

export function* deleteEntityWatcher() {
  yield* takeLatest(DELETE_EVENT, deleteEvent);
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
  try {
    const removeTagRespond = yield call(request, removeTagRequestURL, removeTagRequestOptions);
    if (removeTagRespond) {
      try {
        const addTagRespond = yield call(request, addTagRequestURL, addTagRequestOptions);
        if (addTagRespond) {
          yield put(toogleEventTagScuess(addTagRespond.data, tag));
        }
      } catch (error) {
        yield put(toogleEventTagError(error));
      }
    }
  } catch (error) {
    yield put(toogleEventTagError(error));
  }
}

export function* clickTagWatcher() {
  yield* takeLatest(CLICK_EVENT_TAG, toogleEventTagAutoLabel);
}

// Load Profiles

export function* getProfiles() {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profiles`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(profilesLoaded(respond));
    }
  } catch (error) {
    yield put(profilesLoadingError(error));
  }
}

export function* getProfilesWatcher() {
  yield* takeLatest(LOAD_PROFILES, getProfiles);
}

export function* profilesData() {
  const getProfilesWatcherFork = yield fork(getProfilesWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(getProfilesWatcherFork);
}

// Click Event Tag Saga

export function* addToProfile(action) {
  const { profileID, event } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const addToProfileRequestURL = `http://${url}/api/profiles/${profileID}/validatedevents`;
  const addToProfileRequestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event,
      weight: 1,
    }),
  };
  try {
    const addToProfieRespond = yield call(request, addToProfileRequestURL, addToProfileRequestOptions);
    if (addToProfieRespond) {
      yield put(addEventToProfileSucess(addToProfieRespond, profileID));
    }
  } catch (error) {
    yield put(addEventToProfileError(error, profileID));
  }
}

export function* addToPofileWatcher() {
  yield* takeLatest(ADD_EVENT_TO_PROFILE, addToProfile);
}

// All sagas to be loaded
export default [
  eventsData,
  searchData,
  clickEventWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
  profilesData,
  addToPofileWatcher,
];
