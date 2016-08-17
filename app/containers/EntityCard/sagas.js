import { take, call, put, select, fork, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CLICK_ENTITY_CARD, DELETE_ENTITY } from './constants';
import request from 'utils/request';
import { selectAuth } from './selectors';
import { entityDeleteSucess, entityDeleteError } from './actions';

function checkEntityType(entity) {
  if (entity['@type'].indexOf('Document') !== -1) {
    return 'informationelement';
  }
  if (entity['@type'].indexOf('Event') !== -1) {
    return 'event';
  }
  return undefined;
}

export function* deleteEntity({ entity }) {
  const { username, password } = yield select(selectAuth());
  const base64Toekn = window.btoa(`${username}:${password}`);
  const requestURL = `http://${window.location.hostname}:${window.location.port}$/api/data/${checkEntityType(entity)}/${entity.id}/`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${base64Toekn}`,
    },
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(entityDeleteSucess(respond.data));
  } else {
    yield put(entityDeleteError(respond.err));
  }
}

export function* deleteEntityWatcher() {
  yield* takeLatest(DELETE_ENTITY, deleteEntity);
}

export function* deleteEntiyFork() {
  const watcher = yield fork(deleteEntityWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* clickEntity({ entity }) {
  put({ type: 'SET_MODAL_OPEN', payload: entity });
}

export function* clickEntityWatcher() {
  yield* takeLatest(CLICK_ENTITY_CARD, clickEntity);
}

export function* clickEntiyFork() {
  const watcher = yield fork(clickEntityWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  deleteEntiyFork,
  clickEntiyFork,
];
