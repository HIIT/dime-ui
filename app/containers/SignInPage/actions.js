/*
 *
 * SignInPage actions
 *
 */

import {
  SUBMIT_SIGNIN,
  SIGNIN_SUCCESS,
  SUBMIT_CREATE,
  CREATE_SUCCESS,
} from './constants';

export function submitSignIn(username, password, rememberMe) {
  return {
    type: SUBMIT_SIGNIN,
    username,
    password,
    rememberMe,
  };
}

export function signInSucess(respond) {
  return {
    type: SIGNIN_SUCCESS,
    respond,
  };
}

export function submitCreate(username, password, email, rememberMe) {
  return {
    type: SUBMIT_CREATE,
    username,
    password,
    email,
    rememberMe,
  };
}

export function createSucess(respond) {
  return {
    type: CREATE_SUCCESS,
    respond,
  };
}
