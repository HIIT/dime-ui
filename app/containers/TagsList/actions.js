/*
 *
 * TagsList actions
 *
 */

 import {
   CLICK_TAG,
   CONFIRM_TAG,
   CONFIRM_TAG_ERROR,
   CONFIRM_TAG_SUCESS,
 } from './constants';

 export function clickOnEntityCard(tag, entityID) {
   return {
     type: CLICK_TAG,
     tag,
     entityID,
   };
 }

 export function confrmTag(tag, entityID) {
   return {
     type: CONFIRM_TAG,
     tag,
     entityID,
   };
 }

 export function confrmTagError(error) {
   return {
     type: CONFIRM_TAG_ERROR,
     error,
   };
 }

 export function confrmTagSucess(tag, entityID) {
   return {
     type: CONFIRM_TAG_SUCESS,
     tag,
     entityID,
   };
 }
