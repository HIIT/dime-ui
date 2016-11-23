/*
 *
 * ProfilesPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import unionBy from 'lodash/unionBy';
 import {
   LOAD_PROFILES,
   LOAD_PROFILES_SUCCESS,
   SEARCH_PROFILES,
   SEARCH_PROFILES_SUCCESS,
   CREATE_PROFILE,
   CREATE_PROFILE_SUCCESS,
   EDIT_PROFILE,
   CANCEL_EDIT_PROFILE,
   SAVE_PROFILE_NAME,
   SAVE_PROFILE_NAME_SUCCESS,
   ADD_TAG_TO_PROFILE,
   ADD_TAG_TO_PROFILE_SUCCESS,
   DELETE_TAG_FROM_PROFILE,
   DELETE_TAG_FROM_PROFILE_SUCCESS,
   CLICK_ON_ENTITY_DELETE,
   DELETE_ENTITY_FROM_PROFILE_SUCCESS,
   DELETE_PROFILE,
   DELETE_PROFILE_SUCCESS,
   ENTITY_STATE_TOGGLE,
   ENTITY_STATE_TOGGLE_SUCCESS,
 } from './constants';

 const initialState = fromJS({
   loading: false,
   data: [],
 });

 function profilesPageReducer(state = initialState, action) {
   switch (action.type) {
     case LOAD_PROFILES:
       return state
         .set('loading', true)
         .set('data', fromJS([]));
     case LOAD_PROFILES_SUCCESS:
       return state
         .set('data', fromJS(action.profiles))
         .set('loading', false);
     case SEARCH_PROFILES:
       return state
         .set('loading', true);
     case SEARCH_PROFILES_SUCCESS:
       return state
         .set('data', fromJS(action.profiles))
         .set('loading', false);
     case CREATE_PROFILE:
       return state
         .set('loading', true);
     case CREATE_PROFILE_SUCCESS:
       return state
        .set('loading', false)
        .set('data', state.get('data').unshift(fromJS(action.respond)));
     case EDIT_PROFILE:
       return state
         .setIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID), 'editing'], true);
     case CANCEL_EDIT_PROFILE:
       return state
         .setIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID), 'editing'], false);
     case SAVE_PROFILE_NAME:
       return state
         .set('loading', true);
     case SAVE_PROFILE_NAME_SUCCESS: {
       const profileIndex = state.get('data').findIndex((item) => item.get('id') === action.profileID);
       return state
         .setIn(['data', profileIndex, 'name'], action.name)
         .set('loading', false);
     }
     case ADD_TAG_TO_PROFILE:
       return state.set('loading', true);
     case ADD_TAG_TO_PROFILE_SUCCESS: {
       const profileIndex = state.get('data').findIndex((item) => item.get('id') === action.profileID);
       const tag = fromJS(action.respond);
       return state
         .set('loading', false)
         .updateIn(['data', profileIndex, 'tags'], tags => fromJS(unionBy(tags.toJS(), [tag], 'id')));
     }
     case DELETE_TAG_FROM_PROFILE:
       return state.set('loading', true);
     case DELETE_TAG_FROM_PROFILE_SUCCESS: {
       const profileIndex = state.get('data').findIndex((item) => item.get('id') === action.profileID);
       const tagID = fromJS(action.tagID);
       const tagIndex = state.getIn(['data', profileIndex, 'tags']).findIndex((item) => item.get('id') === tagID);
       return state
         .set('loading', false)
         .deleteIn(['data', profileIndex, 'tags', tagIndex]);
     }
     case CLICK_ON_ENTITY_DELETE:
       return state.set('loading', true);
     case DELETE_ENTITY_FROM_PROFILE_SUCCESS: {
       const { profileID, entityType, entityID } = action;
       const profileIndex = state.get('data').findIndex((item) => item.get('id') === profileID);
       const entityIndex = state.getIn(['data', profileIndex, entityType]).findIndex((item) => item.get('id') === entityID);
       return state
         .deleteIn(['data', profileIndex, entityType, entityIndex])
         .set('loading', false);
     }
     case DELETE_PROFILE:
       return state
         .set('loading', true);
     case DELETE_PROFILE_SUCCESS:
       return state
         .set('loading', false)
         .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID)]);
     case ENTITY_STATE_TOGGLE:
       return state
         .set('loading', true);
     case ENTITY_STATE_TOGGLE_SUCCESS: {
       const { respond, entityID, preEntityType, afterEntityType, profileID } = action;
       const profileIndex = state.get('data').findIndex((item) => item.get('id') === profileID);
       const entityIndex = state.getIn(['data', profileIndex, preEntityType]).findIndex((item) => item.get('id') === entityID);
       return state
         .deleteIn(['data', profileIndex, preEntityType, entityIndex])
         .setIn(['data', profileIndex, afterEntityType], state.getIn(['data', profileIndex, afterEntityType]).unshift(fromJS(respond)))
         .set('loading', false);
     }
     default:
       return state;
   }
 }

 export default profilesPageReducer;
