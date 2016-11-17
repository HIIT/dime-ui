import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_DOCUMENTS, LOAD_MORE_DOCUMENTS, SEARCH_DOCUMENTS, CLICK_DOCUMENT_TAG, DELETE_DOCUMENT,
  LOAD_PROFILES, ADD_DOCUMENT_TO_PROFILE,
} from './constants';
import request from 'utils/request';
import { selectAuth, selectAPI } from './selectors';
import {
  documentsLoaded,
  documentsLoadingError,
  searchDocumentLoaded,
  searchDocumentError,
  deleteDocumentSucess,
  deleteDocumentError,
  toogleDocumentTagScuess,
  toogleDocumentTagError,
  profilesLoaded,
  profilesLoadingError,
  addDocumentToProfileSucess,
  addDocumentToProfileError,
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
    yield put(documentsLoadingError(error));
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
    }
  } catch (error) {
    yield put(searchDocumentError(error));
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
      yield put(deleteDocumentSucess(respond, action.documentID));
    }
  } catch (error) {
    yield put(deleteDocumentError(error, action.documentID));
  }
}

// Click Document Tag Saga

export function* toogleDocumentTagAutoLabel(action) {
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
          yield put(toogleDocumentTagScuess(addTagRespond, tag, documentID));
        }
      } catch (error) {
        yield put(toogleDocumentTagError(error));
      }
    }
  } catch (error) {
    yield put(toogleDocumentTagError(error));
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
      yield put(addDocumentToProfileSucess(respond, profileID));
    }
  } catch (error) {
    yield put(addDocumentToProfileError(error, profileID));
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
  cancelByLocationChange(LOAD_DOCUMENTS, getDocuments),
  cancelByLocationChange(LOAD_MORE_DOCUMENTS, getDocuments),
  cancelByLocationChange(SEARCH_DOCUMENTS, searchDocument),
  cancelByLocationChange(DELETE_DOCUMENT, deleteDocument),
  cancelByLocationChange(CLICK_DOCUMENT_TAG, toogleDocumentTagAutoLabel),
  cancelByLocationChange(LOAD_PROFILES, getProfiles),
  cancelByLocationChange(ADD_DOCUMENT_TO_PROFILE, addToProfile),
];
