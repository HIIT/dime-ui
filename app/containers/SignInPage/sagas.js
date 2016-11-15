import { put, call, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import { SUBMIT_SIGNIN } from './constants';
import { saveCredentials } from 'containers/App/actions';
import { signInSucess, signInError } from './actions';
import { selectAPI } from './selecters';

export function* saveSignIn({ username, password, rememberMe, previousLocation }) {
  const { url } = yield select(selectAPI());
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
        browserHistory.push(previousLocation);
      } else { browserHistory.push('/'); }
    }
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* submitSignInWatcher() {
  yield* takeLatest(SUBMIT_SIGNIN, saveSignIn);
}

// All sagas to be loaded
export default [
  submitSignInWatcher,
];
