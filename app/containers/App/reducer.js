/*
 * AppReducer
 */

import { fromJS } from 'immutable';
import { SAVE_CREDENTIALS, CLEAR_CREDENTIALS, SAVE_LOCATION_BEFORE_SIGN_IN } from './constants';

// The initial state of the App

let initialState = fromJS({
  API: {
    url: `${window.location.hostname}:${window.location.port}`,
  },
  auth: {
    token: undefined,
    rememberMe: undefined,
    locationBeforeSignIn: undefined,
  },
});

if (process.env.NODE_ENV !== 'production') {
  initialState = fromJS({
    API: {
      url: 'localhost:8080',
    },
    auth: {
      token: undefined, // window.btoa('testuser:testuser123')
      rememberMe: undefined,
      locationBeforeSignIn: undefined,
    },
  });
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return state
        .setIn(['auth', 'token'], window.btoa(`${action.username}:${action.password}`))
        .setIn(['auth', 'rememberMe'], action.rememberMe);
    case CLEAR_CREDENTIALS:
      return state
        .setIn(['auth', 'token'], undefined)
        .setIn(['auth', 'rememberMe'], undefined);
    case SAVE_LOCATION_BEFORE_SIGN_IN:
      return state.setIn(['auth', 'locationBeforeSignIn'], fromJS(action.location));
    default:
      return state;
  }
}

export default appReducer;
