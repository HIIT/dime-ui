import { call, put, select } from 'redux-saga/effects';
import {
  LOAD_DOCUMENTS, LOAD_MORE_DOCUMENTS, SEARCH_DOCUMENTS, CLICK_DOCUMENT_TAG, DELETE_DOCUMENT,
  LOAD_PROFILES, ADD_DOCUMENT_TO_PROFILE,
} from './constants';
import request from 'utils/request';
import { receiveAppError, clearAppError } from 'containers/App/actions';
import { cancelByLocationChange } from 'containers/App/sagas';
import { selectAuth, selectAPI } from './selectors';
import {
  documentsLoaded,
  searchDocumentLoaded,
  deleteDocumentSuccess,
  toggleDocumentTagSuccess,
  profilesLoaded,
  addDocumentToProfileSuccess,
} from './actions';

// Init DocumentList Sage (Load Document Sage)

export function* getDocuments(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  let requestURL = `http://${url}/api/data/informationelements?limit=24&page=0`;
  if (action.nextPageNumber) {
    requestURL = `http://${url}/api/data/informationelements?limit=24&page=${action.nextPageNumber}`;
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
      yield put(documentsLoaded(respond));
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Search Sage

export function* searchDocument(action) {
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
      yield put(searchDocumentLoaded(keyword.length > 0 ? respond.docs : respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Click Document Card Saga

export function* clickDocument({ document }) {
  put({ type: 'SET_MODAL_OPEN', payload: document });
}

// Delete Document Card Saga

export function* deleteDocument(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/informationelement/${action.documentID}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(deleteDocumentSuccess(respond, action.documentID));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Click Document Tag Saga

export function* toggleDocumentTagAutoLabel(action) {
  const { tag, documentID } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const removeTagRequestURL = `http://${url}/api/data/informationelement/${documentID}/removetag`;
  const removeTagRequestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  };
  const addTagRequestURL = `http://${url}/api/data/informationelement/${documentID}/addtag`;
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
          yield put(toggleDocumentTagSuccess(addTagRespond, tag, documentID));
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

// Click Document Tag Saga

export function* addToProfile(action) {
  const { profileID, document } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const addToProfileRequestURL = `http://${url}/api/profiles/${profileID}/validatedinformationelements`;
  const addToProfileRequestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      informationelement: document,
      weight: 1,
    }),
  };
  try {
    const respond = yield call(request, addToProfileRequestURL, addToProfileRequestOptions);
    if (respond) {
      yield put(addDocumentToProfileSuccess(respond, profileID));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// All sagas to be loaded
export default [
  cancelByLocationChange(LOAD_DOCUMENTS, getDocuments),
  cancelByLocationChange(LOAD_MORE_DOCUMENTS, getDocuments),
  cancelByLocationChange(SEARCH_DOCUMENTS, searchDocument),
  cancelByLocationChange(DELETE_DOCUMENT, deleteDocument),
  cancelByLocationChange(CLICK_DOCUMENT_TAG, toggleDocumentTagAutoLabel),
  cancelByLocationChange(LOAD_PROFILES, getProfiles),
  cancelByLocationChange(ADD_DOCUMENT_TO_PROFILE, addToProfile),
];
