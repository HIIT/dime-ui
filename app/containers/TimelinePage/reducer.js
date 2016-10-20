/*
 *
 * TimelinePage reducer
 *
*/

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
 LOAD_EVENTS,
 LOAD_EVENTS_SUCCESS,
 LOAD_EVENTS_ERROR,
 LOAD_DOCUMENTS,
 LOAD_DOCUMENTS_SUCCESS,
 LOAD_DOCUMENTS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: {},
  events: [],
  documents: [],
});

function timelinePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('loading', true);
    case LOAD_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', {})
        .set('events', fromJS(action.events));
    case LOAD_EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case LOAD_DOCUMENTS:
      return state
        .set('loading', true);
    case LOAD_DOCUMENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', {})
        .set('documents', fromJS(action.documents));
    case LOAD_DOCUMENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case LOCATION_CHANGE:
      return state
        .set('error', {});
    default:
      return state;
  }
}

export default timelinePageReducer;
