import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest, throttle } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { CLEAR_CREDENTIALS, RECEIVE_APP_ERROR } from './constants';
import { cleanUpLocalStorageSuccess, cleanUpLocalStorageError, showError } from './actions';

function removeState() {
  try {
    localStorage.removeItem('state');
  } catch (error) {
    throw error;
  }
}

function getState() {
  try {
    return JSON.parse(localStorage.getItem('state'));
  } catch (error) {
    throw error;
  }
}

export function* cleanUpLocalStorage() {
  try {
    yield call(removeState);
    const state = yield call(getState);
    if (state && 'app' in state) {
      const fakeResponse = {
        status: 'Internal',
        statusText: 'State exists',
      };
      const error = new Error(fakeResponse.statusText);
      error.response = fakeResponse;
      yield put(cleanUpLocalStorageError(error));
    }
    yield put(cleanUpLocalStorageSuccess());
  } catch (error) {
    yield put(cleanUpLocalStorageError(error));
  }
  yield call(browserHistory.push, '/signin');
}

export function* receiveAppError({ error }) {
  let response = {};
  if (error.response.json) {
    response = yield error.response.json();
  }
  yield put(showError(Object.assign(error, response)));
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
  cancelByLocationChange(CLEAR_CREDENTIALS, cleanUpLocalStorage),
  cancelByLocationChange(RECEIVE_APP_ERROR, receiveAppError),
];
