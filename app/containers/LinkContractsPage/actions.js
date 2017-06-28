/*
 *
 * LinkContractsPage actions
 *
 */
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

export function acceptLinkContractRequest(fromAddress) {
  return {
    type: ACCEPT_LINKCONTRACT_REQUEST,
    fromAddress,
  };
}

export function acceptLinkContractRequestLoaded(fromAddress, linkContracts) {
  return {
    type: ACCEPT_LINKCONTRACT_REQUEST_SUCCESS,
    fromAddress,
    linkContracts,
  };
}

export function declineLinkContractRequest(fromAddress) {
  return {
    type: DECLINE_LINKCONTRACT_REQUEST,
    fromAddress,
  };
}

export function declineLinkContractRequestLoaded(fromAddress) {
  return {
    type: DECLINE_LINKCONTRACT_REQUEST_SUCCESS,
    fromAddress,
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

export function deleteLinkContract(address) {
  return {
    type: DELETE_LINKCONTRACT,
    address,
  };
}

export function deleteLinkContractLoaded(address) {
  return {
    type: DELETE_LINKCONTRACT_SUCCESS,
    address,
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
