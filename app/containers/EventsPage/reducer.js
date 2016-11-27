/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import unionBy from 'lodash/unionBy';
import {
  LOAD_EVENTS,
  LOAD_MORE_EVENTS,
  LOAD_EVENTS_SUCCESS,
  SEARCH_EVENTS,
  SEARCH_EVENTS_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_SUCESS,
  CLICK_EVENT_TAG,
  TOOGLE_EVENT_TAG_SUCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
  ADD_EVENT_TO_PROFILE,
  ADD_EVENT_TO_PROFILE_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  profiles: [],
});

function eventsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('data', fromJS([]))
        .set('loading', true);
    case LOAD_MORE_EVENTS:
      return state
        .set('loading', true);
    case LOAD_EVENTS_SUCCESS:
      return state
        .updateIn(['data'], data => fromJS(unionBy(data.toJS(), action.events, 'id')))
        .set('loading', false);
    case SEARCH_EVENTS:
      return state
        .set('loading', true);
    case SEARCH_EVENTS_SUCCESS:
      return state
        .set('data', fromJS(action.events))
        .set('loading', false)
        .set('error', {});
    case DELETE_EVENT:
      return state
        .set('loading', true);
    case DELETE_EVENT_SUCESS:
      return state
        .set('loading', false)
        .set('error', {})
        .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.eventID)]);
    case CLICK_EVENT_TAG:
      return state
        .set('loading', true)
        .set('error', {});
    case TOOGLE_EVENT_TAG_SUCESS: {
      const eventIndex = state.get('data').findIndex((item) => item.get('id') === action.respond.eventID);
      const newEventWithNewTags = fromJS(action.respond);
      return state
        .set('loading', false)
        .set('error', {})
        .setIn(['data', eventIndex, 'tags'], newEventWithNewTags.getIn(['tags']));
    }
    case LOAD_PROFILES:
      return state
        .set('loading', true);
    case LOAD_PROFILES_SUCCESS:
      return state
        .set('profiles', fromJS(action.profiles))
        .set('loading', false)
        .set('error', {});
    case ADD_EVENT_TO_PROFILE:
      return state.set('loading', true);
    case ADD_EVENT_TO_PROFILE_SUCCESS:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default eventsPageReducer;
