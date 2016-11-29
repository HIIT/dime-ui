import { call, put, select } from 'redux-saga/effects';
import { LOAD_EVENTS, LOAD_DOCUMENTS } from './constants';
import request from 'utils/request';
import { selectAuth, selectAPI } from './selectors';
import { receiveAppError } from 'containers/App/actions';
import { cancelByLocationChange } from 'containers/App/sagas';
import {
  eventsLoaded,
  documentsLoaded,
} from './actions';

// Load Event Sage

export function* getEvents() {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  // const today = new Date();
  const oneWeekBefore = new Date();
  oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
  // const before = action.before ? action.before : today;
  // const after = action.after ? action.after : oneWeekBefore;
  // const requestURL = `http://${url}/api/data/events?before=${before.getTime()}&after=${after.getTime()}`;
  const requestURL = `http://${url}/api/data/events`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(eventsLoaded(respond));
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Load Document sagas

export function* getDocuments(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const today = new Date();
  const oneWeekBefore = new Date(new Date().setDate(today.getDate() - 7));
  const before = action.before ? action.before : today;
  const after = action.after ? action.after : oneWeekBefore;
  const requestURL = `http://${url}/api/data/informationelements?before=${before.getTime()}after=${after.getTime()}`;
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
    yield put(receiveAppError(error));
  }
}

// All sagas to be loaded
export default [
  cancelByLocationChange(LOAD_EVENTS, getEvents),
  cancelByLocationChange(LOAD_DOCUMENTS, getDocuments),
];
