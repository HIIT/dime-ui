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
import { fromJS } from 'immutable';

// Helper function for parsing the get link contract request results

function parseGetLinkContractRequests(respond) {
  const results = [];
  if (respond) {
    for (let i = 0; i < respond.length; i += 1) {
      const obj = {};
      obj.id = respond[i].address;
      obj.fromName = '';
      obj.fromDid = obj.id;
      obj.fromAddress = respond[i].address;
      obj.toName = '';
      obj.toDid = respond[i].to;
      obj.toDidPlusProfile = respond[i].operationVariables['{$get}'][0];
      obj.toAddress = obj.toDid;
      // respond[i].toProfileId = 0; // tmp[1];
      obj.data = fromJS(respond[i]);
      results.push(obj);
    }
  }
  return results;
}

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
      const results = parseGetLinkContractRequests(respond);
      yield put(loadLinkContractRequestsLoaded(results));
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
  const requestURL = `http://${url}/api/requests/approve/${encodeURIComponent(action.fromAddress)}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      const requestURL2 = `http://${url}/api/linkcontracts/view`;
      const options2 = {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      const respond2 = yield call(request, requestURL2, options2);
      let linkContracts = [];
      if (respond) {
        linkContracts = parseGetLinkContracts(respond2);
      }
      yield put(acceptLinkContractRequestLoaded(action.fromAddress, linkContracts));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

export function* declineLinkContractRequest(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/requests/delete?address=${encodeURIComponent(action.fromAddress)}`;
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
      yield put(declineLinkContractRequestLoaded(action.fromAddress));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// Helper function for parsing the get link contract results

function parseGetLinkContracts(respond) {
  const results = [];
  if (respond) {
    for (let i = 0; i < respond.length; i += 1) {
      const obj = {};
      obj.id = respond[i].address;
      obj.fromName = '';
      obj.fromDid = respond[i].requestingAuthority;
      obj.fromAddress = respond[i].address;
      obj.toName = '';
      obj.toDid = respond[i].authorizingAuthority;
      obj.toAddress = respond[i].address;
      obj.data = fromJS(respond[i]);
      results.push(obj);
    }
  }
  return results;
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
      const linkContracts = parseGetLinkContracts(respond);
      yield put(loadLinkContractsLoaded(linkContracts));
      yield put(clearAppError());
    }
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

export function* deleteLinkContract(action) {
  const { token } = yield select(selectAuth());
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/linkcontracts/delete?address=${encodeURIComponent(action.address)}`;
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
      yield put(deleteLinkContractLoaded(action.address));
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
