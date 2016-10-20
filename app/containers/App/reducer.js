/*
 * AppReducer
 */

import { fromJS } from 'immutable';
// The initial state of the App

let initialState = fromJS({
  API: {
    url: `${window.location.hostname}:${window.location.port}`,
  },
});

if (process.env.NODE_ENV !== 'production') {
  initialState = fromJS({
    API: {
      url: 'localhost:8080',
    },
    auth: {
      token: window.btoa('testuser:testuser123'),
    },
  });
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return state
        .setIn(['auth', 'token'], action.payload.token);
    case 'SET_API_ROOT':
      return state
        .setIn(['API', 'url'], action.payload.url);
    default:
      return state;
  }
}

export default appReducer;
