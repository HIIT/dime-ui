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
 } from './constants';

 const initialState = fromJS({
   loading: false,
   error: false,
   data: [],
 });

 function documentsPageReducer(state = initialState, action) {
   switch (action.type) {
     case LOAD_DOCUMENTS:
       return state
         .set('loading', true)
         .set('error', false)
         .set('data', fromJS([]));
     case LOAD_DOCUMENTS_SUCCESS:
       return state
         .set('data', fromJS(action.documents))
         .set('loading', false);
     case LOAD_DOCUMENTS_ERROR:
       return state
         .set('error', action.error)
         .set('loading', false)
         .set('data', fromJS([]));
     default:
       return state;
   }
 }

 export default documentsPageReducer;
