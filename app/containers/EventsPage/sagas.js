import { call, put, select } from 'redux-saga/effects';
import {
  LOAD_EVENTS, LOAD_MORE_EVENTS, SEARCH_EVENTS, CLICK_EVENT_TAG, DELETE_EVENT,
  LOAD_PROFILES, ADD_EVENT_TO_PROFILE,
 } from './constants';
import request from 'utils/request';
import { receiveAppError, clearAppError } from 'containers/App/actions';
import { cancelByLocationChange } from 'containers/App/sagas';
import { selectAuth, selectAPI } from './selectors';
import {
  eventsLoaded,
  searchEventLoaded,
  deleteEventSucess,
  toogleEventTagScuess,
  profilesLoaded,
  addEventToProfileSucess,
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
          yield put(clearAppError());
        }
      } catch (error) {
        yield put(receiveAppError(error));
      }
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
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
