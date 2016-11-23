/*
 *
 * TimelinePage actions
 *
 */

 import {
   LOAD_EVENTS,
   LOAD_EVENTS_SUCCESS,
   LOAD_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
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
