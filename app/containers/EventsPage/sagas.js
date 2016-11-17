import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_EVENTS, LOAD_MORE_EVENTS, SEARCH_EVENTS, CLICK_EVENT_TAG, DELETE_EVENT,
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

export function* getEvents(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  let requestURL = `http://${url}/api/data/events?limit=24&page=0`;
  if (action.nextPageNumber) {
    requestURL = `http://${url}/api/data/events?limit=24&page=${action.nextPageNumber}`;
  }
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
          yield put(toogleEventTagScuess(addTagRespond, tag, eventID));
        }
      } catch (error) {
        yield put(toogleEventTagError(error));
      }
    }
  } catch (error) {
    yield put(toogleEventTagError(error));
  }
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

export function cancelByLocationChange(watchingConstant, func) {
  return function* cancelByLocationChangeGenerater() {
    const watcherFork = yield fork(takeLatest, watchingConstant, func);
    yield take(LOCATION_CHANGE);
    yield cancel(watcherFork);
  };
}

// All sagas to be loaded
export default [
  cancelByLocationChange(LOAD_EVENTS, getEvents),
  cancelByLocationChange(LOAD_MORE_EVENTS, getEvents),
  cancelByLocationChange(SEARCH_EVENTS, searchEvent),
  cancelByLocationChange(DELETE_EVENT, deleteEvent),
  cancelByLocationChange(CLICK_EVENT_TAG, toogleEventTagAutoLabel),
  cancelByLocationChange(LOAD_PROFILES, getProfiles),
  cancelByLocationChange(ADD_EVENT_TO_PROFILE, addToProfile),
];
