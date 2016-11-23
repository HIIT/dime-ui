/*
 *
 * SignInPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   SUBMIT_SIGNIN,
   SIGNIN_SUCCESS,
   SUBMIT_CREATE,
   CREATE_SUCCESS,
 } from './constants';

 const initialState = fromJS({
   loading: false,
 });

 function signInPageReducer(state = initialState, action) {
   switch (action.type) {
     case SUBMIT_SIGNIN:
       return state
         .set('loading', true);
     case SIGNIN_SUCCESS:
       return state
         .set('loading', false);
     case SUBMIT_CREATE:
       return state
         .set('loading', true);
     case CREATE_SUCCESS:
       return state
         .set('loading', false);
     default:
       return state;
   }
 }

 export default signInPageReducer;
