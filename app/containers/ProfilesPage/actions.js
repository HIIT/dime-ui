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
   DELETE_PROFILE,
   DELETE_PROFILE_SUCCESS,
   DELETE_PROFILE_ERROR,
   SEARCH_PROFILES,
   SEARCH_PROFILES_SUCCESS,
   SEARCH_PROFILES_ERROR,
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
  * Delete actions
  *
  */
 export function deleteProfile(name) {
   return {
     type: DELETE_PROFILE,
     name,
   };
 }

 export function deleteProfileSuccess(respond) {
   return {
     type: DELETE_PROFILE_SUCCESS,
     respond,
   };
 }

 export function deleteProfileError(error) {
   return {
     type: DELETE_PROFILE_ERROR,
     error,
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
