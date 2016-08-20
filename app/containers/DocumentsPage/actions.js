/*
 *
 * DocumentsPage actions
 *
 */

 import {
   LOAD_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
   LOAD_DOCUMENTS_ERROR,
   CLICK_DOCUMENT_CARD,
   DELETE_DOCUMENT,
   DELETE_DOCUMENT_SUCESS,
   DELETE_DOCUMENT_ERROR,
   CLICK_DOCUMENT_TAG,
   TOOGLE_DOCUMENT_TAG_SUCESS,
   TOOGLE_DOCUMENT_TAG_ERROR,
 } from './constants';

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

 /*
  *
  * DocumentCard actions
  *
  */

 export function clickOnDocumentCard(document) {
   return {
     type: CLICK_DOCUMENT_CARD,
     document,
   };
 }

 export function deleteDocument(document) {
   return {
     type: DELETE_DOCUMENT,
     document,
   };
 }

 export function deleteDocumentError(error) {
   return {
     type: DELETE_DOCUMENT_ERROR,
     error,
   };
 }

 export function deleteDocumentSucess(respond) {
   return {
     type: DELETE_DOCUMENT_SUCESS,
     respond,
   };
 }

 /*
  *
  * DocumentsTagsList actions
  *
  */

 export function clickOnDocumentTag(tag, documentID) {
   return {
     type: CLICK_DOCUMENT_TAG,
     tag,
     documentID,
   };
 }

 export function toogleDocumentTagScuess(respond) {
   return {
     type: TOOGLE_DOCUMENT_TAG_SUCESS,
     respond,
   };
 }

 export function toogleDocumentTagError(error) {
   return {
     type: TOOGLE_DOCUMENT_TAG_ERROR,
     error,
   };
 }
