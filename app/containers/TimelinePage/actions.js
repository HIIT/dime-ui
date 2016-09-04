/*
 *
 * TimelinePage actions
 *
 */

 import {
   LOAD_EVENTS,
   LOAD_EVENTS_SUCCESS,
   LOAD_EVENTS_ERROR,
   LOAD_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
   LOAD_DOCUMENTS_ERROR,
 } from './constants';

 export function loadEvents() {
   return {
     type: LOAD_EVENTS,
   };
 }

 export function eventsLoaded(events) {
   return {
     type: LOAD_EVENTS_SUCCESS,
     events,
   };
 }

 export function eventsLoadingError(error) {
   return {
     type: LOAD_EVENTS_ERROR,
     error,
   };
 }

 export function loadDocuments() {
   return {
     type: LOAD_DOCUMENTS,
   };
 }

 export function documentsLoaded(documents) {
   return {
     type: LOAD_DOCUMENTS_SUCCESS,
     documents,
   };
 }

 export function documentsLoadingError(error) {
   return {
     type: LOAD_DOCUMENTS_ERROR,
     error,
   };
 }
