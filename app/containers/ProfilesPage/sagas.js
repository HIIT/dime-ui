import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest, throttle } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_PROFILES,
  CREATE_PROFILE,
  DELETE_PROFILE,
  SAVE_PROFILE_NAME,
  ADD_TAG_TO_PROFILE,
  CLICK_ON_ENTITY_TAG,
  DELETE_TAG_FROM_PROFILE,
  CLICK_ON_ENTITY_DELETE,
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
  saveProfileNameSuccess,
  saveProfileNameError,
  addTagToProfileSuccess,
  addTagToProfileError,
  deleteTagFromProfileSuccess,
  deleteTagFromProfileError,
  deleteEntityFromProfileSuccess,
  deleteEntityFromProfileError,
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

// Save Profile Name Saga

export function* saveProfileName(action) {
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
      id: action.profileID,
    }),
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(saveProfileNameSuccess(respond, action.name, action.profileID));
    }
  } catch (error) {
    yield put(saveProfileNameError(error, action.name, action.profileID));
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.tag),
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

export function* deleteTagFromProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/profiles/${action.profileID}/tags/${action.tag.id}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(deleteTagFromProfileSuccess(respond, action.tag.id, action.profileID));
    }
  } catch (error) {
    yield put(deleteTagFromProfileError(error, action.tag.id, action.profileID));
  }
}

export function* deleteEntityFromProfile(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const { entityID, entityType, profileID } = action;
  const requestURL = `http://${url}/api/profiles/${profileID}/${entityType.toLowerCase()}/${entityID}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(deleteEntityFromProfileSuccess(respond, entityID, entityType, profileID));
    }
  } catch (error) {
    yield put(deleteEntityFromProfileError(error, entityID, entityType, profileID));
  }
}

export function cancelByLocationChange(watchingConstant, func) {
  return function* cancelByLocationChangeGenerater() {
    const watcherFork = yield fork(takeLatest, watchingConstant, func);
    yield take(LOCATION_CHANGE);
    yield cancel(watcherFork);
  };
}

export function cancelByLocationChangeWithThrottle(watchingConstant, func, sec) {
  return function* cancelByLocationChangeGenerater() {
    const watcherFork = yield fork(throttle, sec, watchingConstant, func);
    yield take(LOCATION_CHANGE);
    yield cancel(watcherFork);
  };
}


// All sagas to be loaded
export default [
  cancelByLocationChange(LOAD_PROFILES, getProfiles),
  cancelByLocationChange(DELETE_PROFILE, deleteProfile),
  cancelByLocationChange(CREATE_PROFILE, createProfile),
  cancelByLocationChangeWithThrottle(SAVE_PROFILE_NAME, saveProfileName, 2000),
  cancelByLocationChange(ADD_TAG_TO_PROFILE, addTagToProfile),
  cancelByLocationChange(DELETE_TAG_FROM_PROFILE, deleteTagFromProfile),
  cancelByLocationChange(CLICK_ON_ENTITY_TAG, addTagToProfile),
  cancelByLocationChange(CLICK_ON_ENTITY_DELETE, deleteEntityFromProfile),
];
