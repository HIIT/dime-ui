/*
 *
 * EntitiesList actions
 *
 */

import {
  FETCH_DATA,
  SET_MODAL_CLOSE
} from './constants';

export function fetchData (enitiesType) {
  return {
    type: FETCH_DATA,
    entitiesType
  };
}

export function setModalClose () {
  return {
    type: SET_MODAL_CLOSE
  };
}