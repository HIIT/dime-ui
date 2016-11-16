/*
 *
 * ProfilesPage actions
 *
 */

 import {
   LOAD_PROFILES,
   LOAD_PROFILES_SUCCESS,
   LOAD_PROFILES_ERROR,
   CREATE_PROFILE,
   CREATE_PROFILE_SUCCESS,
   CREATE_PROFILE_ERROR,
   EDIT_PROFILE,
   CANCEL_EDIT_PROFILE,
   DELETE_PROFILE,
   DELETE_PROFILE_SUCCESS,
   DELETE_PROFILE_ERROR,
   SEARCH_PROFILES,
   SEARCH_PROFILES_SUCCESS,
   SEARCH_PROFILES_ERROR,
   CLICK_ON_ENTITY_TAG,
 } from './constants';

 export function loadProfiles() {
   return {
     type: LOAD_PROFILES,
   };
 }

 export function profilesLoaded(profiles) {
   return {
     type: LOAD_PROFILES_SUCCESS,
     profiles,
   };
 }

 export function profilesLoadingError(error) {
   return {
     type: LOAD_PROFILES_ERROR,
     error,
   };
 }

 /*
  *
  * Create actions
  *
  */
 export function createProfile(name) {
   return {
     type: CREATE_PROFILE,
     name,
   };
 }

 export function createProfileSuccess(respond) {
   return {
     type: CREATE_PROFILE_SUCCESS,
     respond,
   };
 }

 export function createProfileError(error) {
   return {
     type: CREATE_PROFILE_ERROR,
     error,
   };
 }

 /*
  *
  * Edit actions
  *
  */
 export function editProfile(profileID) {
   return {
     type: EDIT_PROFILE,
     profileID,
   };
 }

 export function cancelEditProfile(profileID) {
   return {
     type: CANCEL_EDIT_PROFILE,
     profileID,
   };
 }

 /*
  *
  * Delete actions
  *
  */
 export function deleteProfile(profileID) {
   return {
     type: DELETE_PROFILE,
     profileID,
   };
 }

 export function deleteProfileSuccess(respond, profileID) {
   return {
     type: DELETE_PROFILE_SUCCESS,
     respond,
     profileID,
   };
 }

 export function deleteProfileError(error, profileID) {
   return {
     type: DELETE_PROFILE_ERROR,
     error,
     profileID,
   };
 }

 /*
  *
  * Search actions
  *
  */
 export function searchProfile(keyword) {
   return {
     type: SEARCH_PROFILES,
     keyword,
   };
 }

 export function searchProfileLoaded(profiles) {
   return {
     type: SEARCH_PROFILES_SUCCESS,
     profiles,
   };
 }

 export function searchProfileError(error) {
   return {
     type: SEARCH_PROFILES_ERROR,
     error,
   };
 }

 /*
  *
  * Click on Entity Tag
  *
  */
 export function clickOnEntityTag(tag, entityID) {
   return {
     type: CLICK_ON_ENTITY_TAG,
     tag,
     entityID,
   };
 }
