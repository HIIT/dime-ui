/*
 *
 * DocumentsPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import unionBy from 'lodash/unionBy';
 import { LOCATION_CHANGE } from 'react-router-redux';
 import {
   LOAD_DOCUMENTS,
   LOAD_MORE_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
   LOAD_DOCUMENTS_ERROR,
   SEARCH_DOCUMENTS,
   SEARCH_DOCUMENTS_SUCCESS,
   SEARCH_DOCUMENTS_ERROR,
   DELETE_DOCUMENT,
   DELETE_DOCUMENT_SUCESS,
   DELETE_DOCUMENT_ERROR,
   CLICK_DOCUMENT_TAG,
   TOOGLE_DOCUMENT_TAG_SUCESS,
   TOOGLE_DOCUMENT_TAG_ERROR,
   LOAD_PROFILES,
   LOAD_PROFILES_SUCCESS,
   LOAD_PROFILES_ERROR,
   ADD_DOCUMENT_TO_PROFILE_ERROR,
 } from './constants';

 const initialState = fromJS({
   loading: false,
   error: {},
   data: [],
   profiles: [],
 });

 function documentsPageReducer(state = initialState, action) {
   switch (action.type) {
     case LOAD_DOCUMENTS:
       return state
         .set('data', fromJS([]))
         .set('loading', true);
     case LOAD_MORE_DOCUMENTS:
       return state
         .set('loading', true);
     case LOAD_DOCUMENTS_SUCCESS:
       return state
         .updateIn(['data'], data => fromJS(unionBy(data.toJS(), action.documents, 'id')))
         .set('loading', false)
         .set('error', {});
     case LOAD_DOCUMENTS_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case SEARCH_DOCUMENTS:
       return state
         .set('loading', true);
     case SEARCH_DOCUMENTS_SUCCESS:
       return state
         .set('data', fromJS(action.documents))
         .set('loading', false)
         .set('error', {});
     case SEARCH_DOCUMENTS_ERROR:
       return state
         .set('data', fromJS([]))
         .set('loading', false)
         .set('error', fromJS(action.error));
     case DELETE_DOCUMENT:
       return state
         .set('loading', true);
     case DELETE_DOCUMENT_SUCESS:
       return state
         .set('loading', false)
         .set('error', {})
         .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.documentID)]);
     case DELETE_DOCUMENT_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case CLICK_DOCUMENT_TAG:
       return state
         .set('loading', true);
     case TOOGLE_DOCUMENT_TAG_SUCESS: {
       const informationDocumentIndex = state.get('data').findIndex((item) => item.get('id') === action.documentID);
       const newInfoDocWithNewTags = fromJS(action.respond);
       return state
         .set('loading', false)
         .set('error', {})
         .setIn(['data', informationDocumentIndex, 'tags'], newInfoDocWithNewTags.getIn(['tags']));
     }
     case TOOGLE_DOCUMENT_TAG_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case LOAD_PROFILES:
       return state
         .set('loading', true);
     case LOAD_PROFILES_SUCCESS:
       return state
         .set('profiles', fromJS(action.profiles))
         .set('loading', false)
         .set('error', {});
     case LOAD_PROFILES_ERROR:
       return state
         .set('profiles', fromJS([]))
         .set('loading', false)
         .set('error', fromJS(action.error));
     case ADD_DOCUMENT_TO_PROFILE_ERROR:
       return state.set('error', fromJS(action.error));
     case LOCATION_CHANGE:
       return state
         .set('error', {});
     default:
       return state;
   }
 }

 export default documentsPageReducer;
