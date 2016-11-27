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
  RECEIVE_APP_ERROR,
  SHOW_APP_ERROR,
  CLEAR_APP_ERROR,
  CLICK_ON_SEND_TO_LEADERBOARD,
  SEND_TO_LEADER_BOARD_SUCCESS,
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

export function receiveAppError(error) {
  return {
    type: RECEIVE_APP_ERROR,
    error,
  };
}

export function showError(error) {
  return {
    type: SHOW_APP_ERROR,
    error,
  };
}

export function clearAppError() {
  return {
    type: CLEAR_APP_ERROR,
  };
}

export function clickOnSendToLeaderBoard() {
  return {
    type: CLICK_ON_SEND_TO_LEADERBOARD,
  };
}

export function sendtoLeaderSuccess(respond) {
  return {
    type: SEND_TO_LEADER_BOARD_SUCCESS,
    respond,
  };
}
