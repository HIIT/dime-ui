/*
 *
 * DocumentsPage actions
 *
 */

 import {
   LOAD_DOCUMENTS,
   LOAD_DOCUMENTS_SUCCESS,
   LOAD_DOCUMENTS_ERROR,
   SEARCH_DOCUMENTS,
   SEARCH_DOCUMENTS_SUCCESS,
   SEARCH_DOCUMENTS_ERROR,
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
  * Search actions
  *
  */
 export function searchDocument(keyword) {
   return {
     type: SEARCH_DOCUMENTS,
     keyword,
   };
 }

 export function searchDocumentLoaded(documents) {
   return {
     type: SEARCH_DOCUMENTS_SUCCESS,
     documents,
   };
 }

 export function searchDocumentError(error) {
   return {
     type: SEARCH_DOCUMENTS_ERROR,
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

 export function deleteDocument(documentID) {
   return {
     type: DELETE_DOCUMENT,
     documentID,
   };
 }

 export function deleteDocumentError(error, documentID) {
   return {
     type: DELETE_DOCUMENT_ERROR,
     error,
     documentID,
   };
 }

 export function deleteDocumentSucess(respond, documentID) {
   return {
     type: DELETE_DOCUMENT_SUCESS,
     respond,
     documentID,
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

 export function toogleDocumentTagScuess(respond, tag) {
   return {
     type: TOOGLE_DOCUMENT_TAG_SUCESS,
     respond,
     tag,
   };
 }

 export function toogleDocumentTagError(error) {
   return {
     type: TOOGLE_DOCUMENT_TAG_ERROR,
     error,
   };
 }
