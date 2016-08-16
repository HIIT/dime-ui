import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import merge from 'lodash/merge';
import { CLICK_TAG } from './constants';
import request from 'utils/request';
import { selectAuth } from './selectors';
import { tagConfirmSucess, tagConfirmError } from './actions';

export function* confirmTag(tag, entityID) {
  const { username, password } = yield select(selectAuth());
  const base64Toekn = window.btoa(`${username}:${password}`);
  const baseURL = `http://${window.location.hostname}:${window.location.port}`;
  const requestURL = `${baseURL}/api/data/informationelement/${entityID}/addrag`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Toekn}`,
    },
    body: JSON.stringify(merge(tag, {
      auto: false,
      actor: 'dime-ui',
      time: new Date().toISOString(),
    })),
  };
  const respond = yield call(request, requestURL, options);
  if (!respond.err) {
    yield put(tagConfirmSucess(respond.data));
  } else {
    yield put(tagConfirmError(respond.err));
  }
}

export function* clickTagWatcher() {
  while (yield take(CLICK_TAG)) {
    yield call(confirmTag);
  }
}

export function* watcher() {
  // Fork watcher so we can continue execution
  const forkedClickTagWatcher = yield fork(clickTagWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(forkedClickTagWatcher);
}

export default [
  watcher,
];
