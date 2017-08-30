/*
 *
 * LinkContractsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LINKCONTRACTREQUESTS,
  LOAD_LINKCONTRACTREQUESTS_SUCCESS,
  SEND_LINKCONTRACT_REQUEST,
  SEND_LINKCONTRACT_REQUEST_SUCCESS,
  ACCEPT_LINKCONTRACT_REQUEST,
  ACCEPT_LINKCONTRACT_REQUEST_SUCCESS,
  DECLINE_LINKCONTRACT_REQUEST,
  DECLINE_LINKCONTRACT_REQUEST_SUCCESS,
  LOAD_LINKCONTRACTS,
  LOAD_LINKCONTRACTS_SUCCESS,
  DELETE_LINKCONTRACT,
  DELETE_LINKCONTRACT_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  linkContractRequests: [],
  linkContracts: [],
  profiles: [],
});

function linkContractsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LINKCONTRACTREQUESTS:
      return state
        .set('loading', true);
    case LOAD_LINKCONTRACTREQUESTS_SUCCESS:
      return state
        .set('linkContractRequests', fromJS(action.linkContractRequests))
        .set('loading', false);

    case SEND_LINKCONTRACT_REQUEST:
      return state
        .set('loading', true);
    case SEND_LINKCONTRACT_REQUEST_SUCCESS: {
      return state
        .set('loading', false);
    }

    case ACCEPT_LINKCONTRACT_REQUEST:
      return state
        .set('loading', true);
    case ACCEPT_LINKCONTRACT_REQUEST_SUCCESS: {
      const itemIndex = state.get('linkContractRequests').findIndex(item => item.get('id') === action.address);
      return itemIndex > -1 ?
        state
          .deleteIn(['linkContractRequests', itemIndex])
          .set('linkContracts', fromJS(action.linkContracts))
          .set('loading', false)
      :
        state
          .set('loading', false);
    }

    case DECLINE_LINKCONTRACT_REQUEST:
      return state
        .set('loading', true);
    case DECLINE_LINKCONTRACT_REQUEST_SUCCESS: {
      const itemIndex = state.get('linkContractRequests').findIndex(item => item.get('id') === action.address);
      return itemIndex > -1 ?
        state
          .deleteIn(['linkContractRequests', itemIndex])
          .set('loading', false)
      :
        state
          .set('loading', false);
    }

    case LOAD_LINKCONTRACTS:
      return state
        .set('loading', true);
    case LOAD_LINKCONTRACTS_SUCCESS:
      return state
        .set('linkContracts', fromJS(action.linkContracts)
        .set('loading', false));

    case DELETE_LINKCONTRACT:
      return state
        .set('loading', true);
    case DELETE_LINKCONTRACT_SUCCESS: {
      const itemIndex = state.get('linkContracts').findIndex(item => item.get('id') === action.address);
      return itemIndex > -1 ?
        state
          .deleteIn(['linkContracts', itemIndex])
          .set('loading', false)
      :
        state
          .set('loading', false);
    }

    case LOAD_PROFILES:
      return state
        .set('loading', true);
    case LOAD_PROFILES_SUCCESS:
      return state
        .set('profiles', fromJS(action.profiles))
        .set('loading', false);

    default:
      return state;
  }
}

export default linkContractsPageReducer;
