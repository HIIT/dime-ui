/*
 *
 * SignInPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   SUBMIT_SIGNIN,
   SIGNIN_SUCESS,
   SIGNIN_ERROR,
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
     case SIGNIN_SUCESS:
       return state
         .set('loading', false)
         .set('error', {});
     case SIGNIN_ERROR:
       return state
         .set('loading', false)
         .set('error', fromJS(action.error));
     default:
       return state;
   }
 }

 export default signInPageReducer;
