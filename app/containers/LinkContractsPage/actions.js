/*
 *
 * LinkContractsPage actions
 *
 */
/*
 import {
   LOAD_LINKCONTRACTS,
   LOAD_LINKCONTRACTS_SUCCESS,
 } from './constants';

 export function loadLinkContracts() {
   return {
     type: LOAD_LINKCONTRACTS,
   };
 }

 export function LinkContractsLoaded(linkContracts) {
   return {
     type: LOAD_LINKCONTRACTS_SUCCESS,
     linkContracts,
   };
 }*/


import {
  LOAD_LINKCONTRACTREQUESTS,
  LOAD_LINKCONTRACTREQUESTS_SUCCESS,
  ACCEPT_LINKCONTRACT_REQUEST,
  ACCEPT_LINKCONTRACT_REQUEST_SUCCESS,
  DECLINE_LINKCONTRACT_REQUEST,
  DECLINE_LINKCONTRACT_REQUEST_SUCCESS,
  LOAD_LINKCONTRACTS,
  LOAD_LINKCONTRACTS_SUCCESS,
  SEARCH_LINKCONTRACTS,
  DELETE_LINKCONTRACT,
  DELETE_LINKCONTRACT_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
} from './constants';

/*
 * Link contract request actions
 */
export function loadLinkContractRequests() {
  return {
    type: LOAD_LINKCONTRACTREQUESTS,
  };
}

export function loadLinkContractRequestsLoaded(linkContractRequests) {
  return {
    type: LOAD_LINKCONTRACTREQUESTS_SUCCESS,
    linkContractRequests,
  };
}

export function acceptLinkContractRequest(fromDid, toAddress) {
  return {
    type: ACCEPT_LINKCONTRACT_REQUEST,
    fromDid,
    toAddress,
  };
}

export function acceptLinkContractRequestLoaded(response) {
  return {
    type: ACCEPT_LINKCONTRACT_REQUEST_SUCCESS,
    response,
  };
}

export function declineLinkContractRequest(fromDid, toAddress) {
  return {
    type: DECLINE_LINKCONTRACT_REQUEST,
    fromDid,
    toAddress,
  };
}

export function declineLinkContractRequestLoaded(response) {
  return {
    type: DECLINE_LINKCONTRACT_REQUEST_SUCCESS,
    response,
  };
}

/*
 * Link contract actions
 */
export function loadLinkContracts() {
  return {
    type: LOAD_LINKCONTRACTS,
  };
}

export function loadLinkContractsLoaded(linkContracts) {
  return {
    type: LOAD_LINKCONTRACTS_SUCCESS,
    linkContracts,
  };
}

export function searchLinkContracts(keyword) {
  return {
    type: SEARCH_LINKCONTRACTS,
    keyword,
  };
}

export function deleteLinkContract(fromDid, toAddress) {
  return {
    type: DELETE_LINKCONTRACT,
    fromDid,
    toAddress,
  };
}

export function deleteLinkContractLoaded(response) {
  return {
    type: DELETE_LINKCONTRACT_SUCCESS,
    response,
  };
}

/*
 *
 * Link contracts Profiles Actions
 *
 */
export function loadProfiles() {
  return {
    type: LOAD_PROFILES,
  };
}

export function profilesLoaded(profiles) {
  return {
    type: LOAD_PROFILES_SUCCESS,
    profiles,
  };
}
