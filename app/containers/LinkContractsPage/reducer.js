/*
 *
 * LinkContractsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LINKCONTRACTREQUESTS,
  LOAD_LINKCONTRACTREQUESTS_SUCCESS,
  LOAD_LINKCONTRACTS,
  LOAD_LINKCONTRACTS_SUCCESS,
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
        .set('loading', false)
        .set('linkContractRequests', fromJS(action.linkContractRequests));

    case LOAD_LINKCONTRACTS:
      return state
        .set('loading', true);
    case LOAD_LINKCONTRACTS_SUCCESS:
      return state
        .set('loading', false)
        .set('linkContracts', fromJS(action.linkContracts));

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
