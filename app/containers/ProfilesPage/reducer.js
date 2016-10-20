/*
 *
 * ProfilesPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import { LOCATION_CHANGE } from 'react-router-redux';
 import {
   LOAD_PROFILES,
   LOAD_PROFILES_SUCCESS,
   LOAD_PROFILES_ERROR,
   SEARCH_PROFILES,
   SEARCH_PROFILES_SUCCESS,
   SEARCH_PROFILES_ERROR,
   CREATE_PROFILE,
   CREATE_PROFILE_SUCCESS,
   CREATE_PROFILE_ERROR,
   EDIT_PROFILE,
   CANCEL_EDIT_PROFILE,
   DELETE_PROFILE,
   DELETE_PROFILE_SUCCESS,
   DELETE_PROFILE_ERROR,
 } from './constants';

 const initialState = fromJS({
   loading: false,
   error: {},
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
         .set('data', fromJS(action.profiles).reverse())
         .set('loading', false)
         .set('error', {});
     case LOAD_PROFILES_ERROR:
       return state
         .set('data', fromJS([]))
         .set('loading', false)
         .set('error', fromJS(action.error));
     case SEARCH_PROFILES:
       return state
         .set('loading', true);
     case SEARCH_PROFILES_SUCCESS:
       return state
         .set('data', fromJS(action.profiles).reverse())
         .set('loading', false)
         .set('error', {});
     case SEARCH_PROFILES_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case CREATE_PROFILE:
       return state
         .set('loading', true);
     case CREATE_PROFILE_SUCCESS:
       return state
        .set('loading', false)
        .set('error', {})
        .set('data', state.get('data').unshift(fromJS(action.respond)));
     case CREATE_PROFILE_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case EDIT_PROFILE:
       return state
         .setIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID), 'editing'], true);
     case CANCEL_EDIT_PROFILE:
       return state
         .setIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID), 'editing'], false);
     case DELETE_PROFILE:
       return state
         .set('loading', true);
     case DELETE_PROFILE_SUCCESS:
       return state
         .set('loading', false)
         .set('error', {})
         .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.profileID)]);
     case DELETE_PROFILE_ERROR:
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

 export default profilesPageReducer;
