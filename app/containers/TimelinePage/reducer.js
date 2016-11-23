/*
 *
 * TimelinePage reducer
 *
*/

import { fromJS } from 'immutable';
import {
 LOAD_EVENTS,
 LOAD_EVENTS_SUCCESS,
 LOAD_DOCUMENTS,
 LOAD_DOCUMENTS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
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
        .set('events', fromJS(action.events));
    case LOAD_DOCUMENTS:
      return state
        .set('loading', true);
    case LOAD_DOCUMENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('documents', fromJS(action.documents));
    default:
      return state;
  }
}

export default timelinePageReducer;
