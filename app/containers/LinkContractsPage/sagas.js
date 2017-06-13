import { call, put, select } from 'redux-saga/effects';
import {
  LOAD_LINKCONTRACTREQUESTS, ACCEPT_LINKCONTRACT_REQUEST, DECLINE_LINKCONTRACT_REQUEST,
  LOAD_LINKCONTRACTS, DELETE_LINKCONTRACT,
 } from './constants';
import request from 'utils/request';
import { receiveAppError, clearAppError } from 'containers/App/actions';
import { cancelByLocationChange } from 'containers/App/sagas';
import { selectAuth, selectAPI } from './selectors';
import {
  loadLinkContractRequestsLoaded,
  acceptLinkContractRequestLoaded,
  declineLinkContractRequestLoaded,
  loadLinkContractsLoaded,
  deleteLinkContractLoaded,
} from './actions';

// Load Link Contract Requests Saga

export function* getLinkContractRequests() { // action
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/requests/view`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      for (let i = 0; i < respond.length; i += 1) {
        const tmp = respond[i].address.split('[$msg]@~');
        respond[i].fromDid = respond[i].from;
        respond[i].toDid = tmp[0];
        respond[i].toProfileId = tmp[1];
        respond[i].data = { info: 'No further data available' };
      }
      yield put(loadLinkContractRequestsLoaded(respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Accept Link Contract Requests Saga

export function* acceptLinkContractRequest(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/requests/approve/${action.toAddress}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      console.log(respond);
      // yield put(getLinkContractRequests()); ??
      // yield put(getLinkContracts()); ??
      yield put(acceptLinkContractRequestLoaded({}));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

export function* declineLinkContractRequest(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/requests/delete?address=${action.toAddress}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      console.log(respond);
      // yield put(getLinkContractRequests()); ??
      // yield put(getLinkContracts()); ??
      yield put(declineLinkContractRequestLoaded(respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Load Link Contracts Saga

export function* getLinkContracts() { // action
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/linkcontracts/view`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      console.log(respond);
      for (let i = 0; i < respond.length; i += 1) {
        respond[i].fromDid = respond[i].requestingAuthority;
        respond[i].toDid = respond[i].authorizingAuthority;
        respond[i].data = { address: respond[i].address };

        /* const requestURL2 = `http://${url}/api/linkcontracts/data/`;
        const respond2 = yield call(request, requestURL2, options);
        if (respond2) {
          console.log('got extra data');
          console.log(respond2);
          respond[i].data = respond2;
        } */
      }
      console.log(respond);
      yield put(loadLinkContractsLoaded(respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

export function* deleteLinkContract(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/delete?address=${action.toAddress}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      // yield put(getLinkContractRequests()); ??
      // yield put(getLinkContracts()); ??
      yield put(deleteLinkContractLoaded(respond));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// All sagas to be loaded
export default [
  cancelByLocationChange(LOAD_LINKCONTRACTREQUESTS, getLinkContractRequests),
  cancelByLocationChange(ACCEPT_LINKCONTRACT_REQUEST, acceptLinkContractRequest),
  cancelByLocationChange(DECLINE_LINKCONTRACT_REQUEST, declineLinkContractRequest),
  cancelByLocationChange(LOAD_LINKCONTRACTS, getLinkContracts),
  cancelByLocationChange(DELETE_LINKCONTRACT, deleteLinkContract),
];
