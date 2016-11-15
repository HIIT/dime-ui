import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
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
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(searchProfileLoaded(keyword.length > 0 ? respond.docs : respond));
    }
  } catch (error) {
    yield put(searchProfileError(error));
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
  const requestURL = `http://${url}/api/profiles`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      '@type': 'Profile',
      name: action.name,
      tags: [],
    }),
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      const profile = respond;
      profile.editing = true;
      yield put(createProfileSuccess(profile, action.profileID));
    }
  } catch (error) {
    yield put(createProfileError(error, action.profileID));
  }
}

export function* createProfileWatcher() {
  yield* takeLatest(CREATE_PROFILE, createProfile);
}

// Delete Profile Saga

export function* deleteProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profiles/${action.profileID}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(deleteProfileSuccess(respond, action.profileID));
    }
  } catch (error) {
    yield put(deleteProfileError(error, action.profileID));
  }
}

export function* deleteProfileWatcher() {
  yield* takeLatest(DELETE_PROFILE, deleteProfile);
}


// All sagas to be loaded
export default [
  profilesData,
  searchData,
  deleteProfileWatcher,
  createProfileWatcher,
];
