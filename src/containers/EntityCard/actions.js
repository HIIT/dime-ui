import {
  CLICK_ENTITY_CARD,
  DELETE_ENTITY,
  DELETE_ENTITY_ERROR,
  DELETE_ENTITY_SUCESS
} from './constants';

export function clickOnEntityCard (entityID) {
  return {
    type: CLICK_ENTITY_CARD,
    entityID
  }
}

export function deleteEntity (entityID) {
  return {
    type: DELETE_ENTITY,
    entityID,
  }
}

export function deleteEntityError(error) {
  return {
    type: DELETE_ENTITY_ERROR,
    error,
  }
}

export function deleteEntitySucess(entityID) {
  return {
    type: DELETE_ENTITY_SUCESS,
    entityID,
  }
}