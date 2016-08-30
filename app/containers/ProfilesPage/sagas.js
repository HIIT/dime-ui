import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_PROFILES, SEARCH_PROFILES, CREATE_PROFILE, DELETE_PROFILE } from './constants';
import request from 'utils/request';
import { selectAuth, selectAPI } from './selectors';
import {
  profilesLoaded,
  profilesLoadingError,
  searchProfileLoaded,
  searchProfileError,
  deleteProfileSuccess,
  deleteProfileError,
  createProfileSuccess,
  createProfileError,
} from './actions';

// Init ProfileList Sage (Load Profile Sage)

export function* getProfiles() {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/informationelements`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(profilesLoaded(respond.data));
  } else {
    yield put(profilesLoadingError(respond.err));
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

// Search Sage

export function* searchProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const { keyword } = action;
  const requestURL = keyword.length > 0 ? `http://${url}/api/search?query=${keyword}` : `http://${url}/api/data/informationelements`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(searchProfileLoaded(keyword.length > 0 ? respond.data.docs : respond.data));
  } else {
    yield put(searchProfileError(respond.err));
  }
}

export function* searchWatcher() {
  yield* takeLatest(SEARCH_PROFILES, searchProfile);
}

export function* searchData() {
  const searchWatcherFork = yield fork(searchWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(searchWatcherFork);
}

// Create Profile Saga

export function* createProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profile`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: action.name,
    }),
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(createProfileSuccess(respond.data, action.profileID));
  } else {
    yield put(createProfileError(respond.err, action.profileID));
  }
}

export function* createProfileWatcher() {
  yield* takeEvery(CREATE_PROFILE, createProfile);
}

// Delete Profile Saga

export function* deleteProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profile/${action.profileID}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(deleteProfileSuccess(respond.data, action.profileID));
  } else {
    yield put(deleteProfileError(respond.err, action.profileID));
  }
}

export function* deleteProfileWatcher() {
  yield* takeEvery(DELETE_PROFILE, deleteProfile);
}


// All sagas to be loaded
export default [
  profilesData,
  searchData,
  deleteProfileWatcher,
  createProfileWatcher,
];
