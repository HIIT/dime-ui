/*
 *
 * SignInPage actions
 *
 */

import {
  SUBMIT_SIGNIN,
  SIGNIN_SUCESS,
  SIGNIN_ERROR,
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
    type: SIGNIN_SUCESS,
    respond,
  };
}

export function signInError(error) {
  return {
    type: SIGNIN_ERROR,
    error,
  };
}
