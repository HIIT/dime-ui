/*
 *
 * EntitiesList reducer
 *
 */

import { fromJS, Map, List } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_HIGHLIGHT_ENTITY,
  GET_EMOTION_SUCCEEDED,
  GET_EMOTION_FAILED,
  GET_EMOTION_REQUESTED
} from './constants';

import {entitiesListData} from '../../containers/EntitiesList'

const initialState = fromJS({
  highlightEntity: null,
  error: {
    message: ''
  },
  cluster: [],
  loading: {
    status: false
  }
});

function entitiesListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case CHANGE_HIGHLIGHT_ENTITY:
      return state.set('highlightEntity', action.payload)
    case GET_EMOTION_SUCCEEDED:
      let newCLuster = state.get('cluster').push(...action.payload);
      return state.set('cluster', newCLuster).set('loading',  fromJS({status: false})).set('error', fromJS({message: ''}))
    case GET_EMOTION_FAILED:
      return state.set('error',  action.payload).set('loading',  fromJS({status: false}))
    case GET_EMOTION_REQUESTED:
      return state.set('loading',  fromJS({status: true}))
    default:
      return state
  }
}

export default entitiesListReducer;
