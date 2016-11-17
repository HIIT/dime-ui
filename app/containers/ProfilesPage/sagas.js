import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_PROFILES,
  CREATE_PROFILE,
  DELETE_PROFILE,
  CLICK_ON_ENTITY_TAG,
} from './constants';
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
  addTagToProfileSuccess,
  addTagToProfileError,
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
      respond.editing = true;
      yield put(createProfileSuccess(respond, action.profileID));
    }
  } catch (error) {
    yield put(createProfileError(error, action.profileID));
  }
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

export function* addTagToProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profiles/${action.profileID}/tags`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(addTagToProfileSuccess(respond, action.profileID));
    }
  } catch (error) {
    yield put(addTagToProfileError(error, action.profileID));
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
  cancelByLocationChange(LOAD_PROFILES, getProfiles),
  cancelByLocationChange(DELETE_PROFILE, deleteProfile),
  cancelByLocationChange(CREATE_PROFILE, createProfile),
  cancelByLocationChange(CLICK_ON_ENTITY_TAG, addTagToProfile),
];
