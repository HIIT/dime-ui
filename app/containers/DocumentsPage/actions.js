/*
*
* DocumentsPage actions
*
*/

import {
 LOAD_DOCUMENTS,
 LOAD_MORE_DOCUMENTS,
 LOAD_DOCUMENTS_SUCCESS,
 SEARCH_DOCUMENTS,
 SEARCH_DOCUMENTS_SUCCESS,
 CLICK_DOCUMENT_CARD,
 DELETE_DOCUMENT,
 DELETE_DOCUMENT_SUCCESS,
 CLICK_DOCUMENT_TAG,
 REMOVE_DOCUMENT_TAG_SUCCESS,
 TOGGLE_DOCUMENT_TAG_SUCCESS,
 LOAD_PROFILES,
 LOAD_PROFILES_SUCCESS,
 ADD_DOCUMENT_TO_PROFILE,
 ADD_DOCUMENT_TO_PROFILE_SUCCESS,
 REMOVE_DOCUMENT_FROM_PROFILE,
 REMOVE_DOCUMENT_FROM_PROFILE_SUCCESS,
} from './constants';

export function loadDocuments() {
  return {
    type: LOAD_DOCUMENTS,
  };
}

export function loadMoreDocuments(nextPageNumber) {
  return {
    type: LOAD_MORE_DOCUMENTS,
    nextPageNumber,
  };
}

export function documentsLoaded(documents) {
  return {
    type: LOAD_DOCUMENTS_SUCCESS,
    documents,
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

export function deleteDocumentSuccess(respond, documentID) {
  return {
    type: DELETE_DOCUMENT_SUCCESS,
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

export function removeDocumentTagSuccess(respond, tag, documentID) {
  return {
    type: REMOVE_DOCUMENT_TAG_SUCCESS,
    respond,
    tag,
    documentID,
  };
}

export function toggleDocumentTagSuccess(respond, tag, documentID) {
  return {
    type: TOGGLE_DOCUMENT_TAG_SUCCESS,
    respond,
    tag,
    documentID,
  };
}

/*
*
* Documents Profiles Actions
*
*/

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

export function addDocumentToProfile(document, profileID) {
  return {
    type: ADD_DOCUMENT_TO_PROFILE,
    document,
    profileID,
  };
}

export function addDocumentToProfileSuccess(respond, profileID) {
  return {
    type: ADD_DOCUMENT_TO_PROFILE_SUCCESS,
    profileID,
  };
}

export function removeDocumentFromProfile(document, profileID) {
  return {
    type: REMOVE_DOCUMENT_FROM_PROFILE,
    document,
    profileID,
  };
}

export function removeDocumentFromProfileSuccess(respond, profileID) {
  return {
    type: REMOVE_DOCUMENT_FROM_PROFILE_SUCCESS,
    document,
    profileID,
  };
}
