/*
 *
 * DocumentsPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import unionBy from 'lodash/unionBy';
 import {
   LOAD_DOCUMENTS,
   LOAD_MORE_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
   SEARCH_DOCUMENTS,
   SEARCH_DOCUMENTS_SUCCESS,
   DELETE_DOCUMENT,
   DELETE_DOCUMENT_SUCESS,
   CLICK_DOCUMENT_TAG,
   TOOGLE_DOCUMENT_TAG_SUCESS,
   LOAD_PROFILES,
   LOAD_PROFILES_SUCCESS,
   ADD_DOCUMENT_TO_PROFILE,
   ADD_DOCUMENT_TO_PROFILE_SUCCESS,
 } from './constants';

 const initialState = fromJS({
   loading: false,
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
         .set('loading', false);
     case SEARCH_DOCUMENTS:
       return state
         .set('loading', true);
     case SEARCH_DOCUMENTS_SUCCESS:
       return state
         .set('data', fromJS(action.documents))
         .set('loading', false);
     case DELETE_DOCUMENT:
       return state
         .set('loading', true);
     case DELETE_DOCUMENT_SUCESS:
       return state
         .set('loading', false)
         .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.documentID)]);
     case CLICK_DOCUMENT_TAG:
       return state
         .set('loading', true);
     case TOOGLE_DOCUMENT_TAG_SUCESS: {
       const informationDocumentIndex = state.get('data').findIndex((item) => item.get('id') === action.documentID);
       const newInfoDocWithNewTags = fromJS(action.respond);
       return state
         .set('loading', false)
         .setIn(['data', informationDocumentIndex, 'tags'], newInfoDocWithNewTags.getIn(['tags']));
     }
     case LOAD_PROFILES:
       return state
         .set('loading', true);
     case LOAD_PROFILES_SUCCESS:
       return state
         .set('profiles', fromJS(action.profiles))
         .set('loading', false);
     case ADD_DOCUMENT_TO_PROFILE:
       return state.set('loading', true);
     case ADD_DOCUMENT_TO_PROFILE_SUCCESS:
       return state.set('loading', false);
     default:
       return state;
   }
 }

 export default documentsPageReducer;
