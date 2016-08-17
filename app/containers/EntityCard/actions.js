/*
 *
 * EntityCard actions
 *
 */

 import {
   CLICK_ENTITY_CARD,
   DELETE_ENTITY,
   DELETE_ENTITY_ERROR,
   DELETE_ENTITY_SUCESS,
 } from './constants';

 export function clickOnEntityCard(entity) {
   return {
     type: CLICK_ENTITY_CARD,
     entity,
   };
 }

 export function deleteEntity(entity) {
   return {
     type: DELETE_ENTITY,
     entity,
   };
 }

 export function deleteEntityError(error) {
   return {
     type: DELETE_ENTITY_ERROR,
     error,
   };
 }

 export function deleteEntitySucess(respond) {
   return {
     type: DELETE_ENTITY_SUCESS,
     respond,
   };
 }
