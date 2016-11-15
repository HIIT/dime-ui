import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_EVENTS, LOAD_DOCUMENTS } from './constants';
import request from 'utils/request';
import { selectAuth, selectAPI } from './selectors';
import {
  eventsLoaded,
  eventsLoadingError,
  documentsLoaded,
  documentsLoadingError,
} from './actions';

// Load Event Sage

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

// Load Document sagas

export function* getDocuments() {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/informationelements`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(documentsLoaded(respond));
    }
  } catch (error) {
    yield put(documentsLoadingError(error));
  }
}

export function* getDocumentsWatcher() {
  yield* takeLatest(LOAD_DOCUMENTS, getDocuments);
}

export function* documentsData() {
  const getDocumentsWatcherFork = yield fork(getDocumentsWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(getDocumentsWatcherFork);
}

// All sagas to be loaded
export default [
  eventsData,
  documentsData,
];
