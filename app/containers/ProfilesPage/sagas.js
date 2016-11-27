import { call, put, select } from 'redux-saga/effects';
import {
  LOAD_PROFILES,
  CREATE_PROFILE,
  DELETE_PROFILE,
  SAVE_PROFILE_NAME,
  ADD_TAG_TO_PROFILE,
  CLICK_ON_ENTITY_TAG,
  DELETE_TAG_FROM_PROFILE,
  CLICK_ON_ENTITY_DELETE,
  ENTITY_STATE_TOGGLE,
} from './constants';
import request from 'utils/request';
import { receiveAppError, clearAppError } from 'containers/App/actions';
import { cancelByLocationChange, cancelByLocationChangeWithThrottle } from 'containers/App/sagas';
import { selectAuth, selectAPI } from './selectors';
import {
  profilesLoaded,
  searchProfileLoaded,
  deleteProfileSuccess,
  createProfileSuccess,
  saveProfileNameSuccess,
  addTagToProfileSuccess,
  deleteTagFromProfileSuccess,
  deleteEntityFromProfileSuccess,
  entityStateToggleScuess,
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
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
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Click Document Tag Saga

function returnNewEntityType(entityType) {
  switch (entityType) {
    case 'suggestedEvents': { return 'validatedEvents'; }
    case 'validatedEvents': { return 'suggestedEvents'; }
    case 'suggestedInformationElements': { return 'validatedInformationElements'; }
    case 'validatedInformationElements': { return 'suggestedInformationElements'; }
    default: return null;
  }
}

export function* entityStateToggle(action) {
  const { entity, profileID } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const preEntityType = action.entityType;
  const removeEntityFromProfileRequestURL = `http://${url}/api/profiles/${profileID}/${preEntityType.toLowerCase()}/${entity.id}`;
  const removeEntityFromProfile = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const afterEntitytype = returnNewEntityType(action.entityType);
  const addEntityBackToProfileRequestURL = `http://${url}/api/profiles/${profileID}/${afterEntitytype.toLowerCase()}`;
  const addEntityBackToProfileOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entity),
  };
  try {
    const removeEntityFromProfileRespond = yield call(request, removeEntityFromProfileRequestURL, removeEntityFromProfile);
    if (removeEntityFromProfileRespond) {
      try {
        const addEntityBackToProfileRespond = yield call(request, addEntityBackToProfileRequestURL, addEntityBackToProfileOptions);
        if (addEntityBackToProfileRespond) {
          yield put(entityStateToggleScuess(addEntityBackToProfileRespond, entity.id, preEntityType, afterEntitytype, profileID));
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
  cancelByLocationChange(ENTITY_STATE_TOGGLE, entityStateToggle),
];
