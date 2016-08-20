/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
});

function eventsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS([]));
    case LOAD_EVENTS_SUCCESS:
      return state
        .set('data', fromJS(action.events))
        .set('loading', false);
    case LOAD_EVENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default eventsPageReducer;
