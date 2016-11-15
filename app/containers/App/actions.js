/*
 *
 * App actions
 *
 */

import {
  SAVE_LOCATION_BEFORE_SIGN_IN,
  SAVE_CREDENTIALS,
  CLEAR_CREDENTIALS,
} from './constants';

export function saveCredentials(username, password, rememberMe) {
  return {
    type: SAVE_CREDENTIALS,
    username,
    password,
    rememberMe,
  };
}

export function clearCredentials() {
  return {
    type: CLEAR_CREDENTIALS,
  };
}

export function saveLocationBeforeSignIn(location) {
  return {
    type: SAVE_LOCATION_BEFORE_SIGN_IN,
    location,
  };
}
