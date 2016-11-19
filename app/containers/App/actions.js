/*
 *
 * App actions
 *
 */

import {
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
