import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DOCUMENTS, CLICK_DOCUMENT_TAG, CLICK_DOCUMENT_CARD, DELETE_DOCUMENT } from './constants';
import request from 'utils/request';
import merge from 'lodash/merge';
import { selectAuth, selectAPI } from './selectors';
import {
  documentsLoaded,
  documentsLoadingError,
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
    yield put(documentsLoadingError(respond.err));
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
  const { id } = action.document;
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/data/informationelement/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(deleteDocumentSucess(respond.data));
  } else {
    yield put(deleteDocumentError(respond.err));
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
  const requestURL = `http://${url}/api/data/informationelement/${documentID}/addtag`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merge(tag, {
      auto: !tag.auto,
      actor: 'dime-ui',
      time: new Date().toISOString(),
    })),
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(toogleDocumentTagScuess(respond.data));
  } else {
    yield put(toogleDocumentTagError(respond.err));
  }
}

export function* clickTagWatcher() {
  yield* takeEvery(CLICK_DOCUMENT_TAG, toogleDocumentTagAutoLabel);
}

// All sagas to be loaded
export default [
  documentsData,
  clickDocumentWatcherPlusLocationChangeCanceler,
  deleteEntityWatcher,
  clickTagWatcher,
];
