import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_DOCUMENTS, SEARCH_DOCUMENTS, CLICK_DOCUMENT_TAG, CLICK_DOCUMENT_CARD, DELETE_DOCUMENT,
  LOAD_PROFILES, ADD_DOCCUMENT_TO_PROFILE,
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

export function* searchWatcher() {
  yield* takeLatest(SEARCH_DOCUMENTS, searchDocument);
}

export function* searchData() {
  const searchWatcherFork = yield fork(searchWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(searchWatcherFork);
}

// Click Document Card Saga

export function* clickDocument({ document }) {
  put({ type: 'SET_MODAL_OPEN', payload: document });
}

export function* clickDocumentWatcher() {
  yield* takeLatest(CLICK_DOCUMENT_CARD, clickDocument);
}

export function* clickDocumentWatcherPlusLocationChangeCanceler() {
  const watcher = yield fork(clickDocumentWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* deleteEntityWatcher() {
  yield* takeLatest(DELETE_DOCUMENT, deleteDocument);
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

export function* clickTagWatcher() {
  yield* takeLatest(CLICK_DOCUMENT_TAG, toogleDocumentTagAutoLabel);
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

export function* getProfilesWatcher() {
  yield* takeLatest(LOAD_PROFILES, getProfiles);
}

export function* profilesData() {
  const getProfilesWatcherFork = yield fork(getProfilesWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(getProfilesWatcherFork);
}

// Click Document Tag Saga

export function* addToProfile(action) {
  const { profileID, document } = action;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const addToProfileRequestURL = `http://${url}/api/profiles/${profileID}/validateinformationelement`;
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

export function* addToPofileWatcher() {
  yield* takeLatest(ADD_DOCCUMENT_TO_PROFILE, addToProfile);
}

// All sagas to be loaded
export default [
  documentsData,
  searchData,
  clickDocumentWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
  profilesData,
  addToPofileWatcher,
];
