/*
 *
 * DocumentsPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   LOAD_DOCUMENTS,
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
 } from './constants';

 const initialState = fromJS({
   loading: false,
   error: {},
   data: [],
 });

 function documentsPageReducer(state = initialState, action) {
   switch (action.type) {
     case LOAD_DOCUMENTS:
       return state
         .set('loading', true)
         .set('data', fromJS([]));
     case LOAD_DOCUMENTS_SUCCESS:
       return state
         .set('data', fromJS(action.documents))
         .set('loading', false)
         .set('error', fromJS({}));
     case LOAD_DOCUMENTS_ERROR:
       return state
         .set('data', fromJS([]))
         .set('loading', false)
         .set('error', fromJS(action.error));
     case SEARCH_DOCUMENTS:
       return state
         .set('loading', true);
     case SEARCH_DOCUMENTS_SUCCESS:
       return state
         .set('data', fromJS(action.documents))
         .set('loading', false)
         .set('error', fromJS({}));
     case SEARCH_DOCUMENTS_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case DELETE_DOCUMENT:
       return state
         .set('loading', true);
     case DELETE_DOCUMENT_SUCESS:
       return state
         .set('loading', false)
         .set('error', fromJS({}))
         .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.documentID)]);
     case DELETE_DOCUMENT_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case CLICK_DOCUMENT_TAG:
       return state
         .set('loading', true);
     case TOOGLE_DOCUMENT_TAG_SUCESS: {
       const informationDocumentIndex = state.get('data').findIndex((item) => item.get('id') === action.respond.id);
       const newInfoDocWithNewTags = fromJS(action.respond);
       return state
         .set('loading', false)
         .set('error', fromJS({}))
         .setIn(['data', informationDocumentIndex, 'tags'], newInfoDocWithNewTags.getIn(['tags']));
     }
     case TOOGLE_DOCUMENT_TAG_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     default:
       return state;
   }
 }

 export default documentsPageReducer;
