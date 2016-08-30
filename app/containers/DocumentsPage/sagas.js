import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DOCUMENTS, SEARCH_DOCUMENTS, CLICK_DOCUMENT_TAG, CLICK_DOCUMENT_CARD, DELETE_DOCUMENT } from './constants';
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
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(documentsLoaded(respond.data));
  } else {
    yield put(documentsLoadingError(respond));
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
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(searchDocumentLoaded(keyword.length > 0 ? respond.data.docs : respond.data));
  } else {
    yield put(searchDocumentError(respond));
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
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(deleteDocumentSucess(respond.data, action.documentID));
  } else {
    yield put(deleteDocumentError(respond, action.documentID));
  }
}

export function* deleteEntityWatcher() {
  yield* takeEvery(DELETE_DOCUMENT, deleteDocument);
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
  const removeTagRespond = yield call(request, removeTagRequestURL, removeTagRequestOptions);
  if (!removeTagRespond.err) {
    const addTagRespond = yield call(request, addTagRequestURL, addTagRequestOptions);
    if (!addTagRespond.err) {
      yield put(toogleDocumentTagScuess(addTagRespond.data, tag));
    } else {
      yield put(toogleDocumentTagError(addTagRespond.err));
    }
  } else {
    yield put(toogleDocumentTagError(removeTagRespond.err));
  }
}

export function* clickTagWatcher() {
  yield* takeEvery(CLICK_DOCUMENT_TAG, toogleDocumentTagAutoLabel);
}

// All sagas to be loaded
export default [
  documentsData,
  searchData,
  clickDocumentWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
];
