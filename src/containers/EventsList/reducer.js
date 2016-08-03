import {
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS,
  LOAD_EVENTS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: false,
  data: false
})

function eventsListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
    case LOAD_EVENTS_SUCCESS:
      return state
        .set('data', action.events)
        .set('loading', false)
    case LOAD_EVENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('data',false)
    default:
      return state;
  }
}

export default eventsListReducer;