import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { takeLatest, throttle } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import { CLEAR_CREDENTIALS, RECEIVE_APP_ERROR, CLICK_ON_SEND_TO_LEADERBOARD } from './constants';
import { cleanUpLocalStorageSuccess, cleanUpLocalStorageError, showError, sendtoLeaderSuccess, clearAppError } from './actions';
import { selectAuthDomain, selectAPI } from './selectors';

export function* sendtoLeaderBoard() {
  const { token } = yield select(selectAuthDomain());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/updateleaderboard`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(sendtoLeaderSuccess(respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

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
  cancelByLocationChange(CLICK_ON_SEND_TO_LEADERBOARD, sendtoLeaderBoard),
  cancelByLocationChange(RECEIVE_APP_ERROR, receiveAppError),
];
