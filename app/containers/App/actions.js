/*
 *
 * App actions
 *
 */

import {
  SAVE_CREDENTIALS,
  CLEAR_CREDENTIALS,
  CLEAR_CREDENTIALS_SUCCESS,
  CLEAR_CREDENTIALS_ERROR,
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

export function cleanUpLocalStorageSuccess() {
  return {
    type: CLEAR_CREDENTIALS_SUCCESS,
  };
}

export function cleanUpLocalStorageError(error) {
  return {
    type: CLEAR_CREDENTIALS_ERROR,
    error,
  };
}
