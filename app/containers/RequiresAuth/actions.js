import {
  SAVE_LOCATION_BEFORE_SIGN_IN,
} from './constants';

export function saveLocationBeforeSignIn(location) {
  return {
    type: SAVE_LOCATION_BEFORE_SIGN_IN,
    location,
  };
}
