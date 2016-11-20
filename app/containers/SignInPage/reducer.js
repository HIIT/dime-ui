/*
 *
 * SignInPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   SUBMIT_SIGNIN,
   SIGNIN_SUCCESS,
   SIGNIN_ERROR,
   SUBMIT_CREATE,
   CREATE_SUCCESS,
   CREATE_ERROR,
 } from './constants';

 const initialState = fromJS({
   loading: false,
   error: {},
 });

 function signInPageReducer(state = initialState, action) {
   switch (action.type) {
     case SUBMIT_SIGNIN:
       return state
         .set('loading', true);
     case SIGNIN_SUCCESS:
       return state
         .set('loading', false)
         .set('error', {});
     case SIGNIN_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     case SUBMIT_CREATE:
       return state
         .set('loading', true);
     case CREATE_SUCCESS:
       return state
         .set('loading', false)
         .set('error', {});
     case CREATE_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     default:
       return state;
   }
 }

 export default signInPageReducer;
