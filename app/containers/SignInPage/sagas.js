import { put, call, select, take, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { SUBMIT_SIGNIN } from './constants';
import { saveCredentials } from 'containers/App/actions';
import { signInSucess, signInError } from './actions';
import { selectAPI, selectLocationBeforeSignIn } from './selecters';

export function* saveSignIn({ username, password, rememberMe }) {
  const { url } = yield select(selectAPI());
  const previousLocation = yield select(selectLocationBeforeSignIn());
  const token = window.btoa(`${username}:${password}`);
  const requestURL = `http://${url}/api/ping`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(signInSucess(respond));
      yield put(saveCredentials(username, password, rememberMe, respond.userId));
      if (previousLocation) {
        yield call(browserHistory.push, previousLocation);
      } else {
        yield call(browserHistory.push, '/');
      }
    }
  } catch (e) {
    // This is an ugly fix should be avoided. It was intend to disaply corret(but fake) info 401 for the user but currently /api/ping does not return corrent response.
    const fakeResponse = {
      status: 401,
      statusText: 'Unauthorized',
    };
    const error = new Error(fakeResponse.statusText);
    error.response = fakeResponse;
    yield put(signInError(error));
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
  cancelByLocationChange(SUBMIT_SIGNIN, saveSignIn),
];
