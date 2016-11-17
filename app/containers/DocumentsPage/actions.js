/*
*
* DocumentsPage actions
*
*/

import {
 LOAD_DOCUMENTS,
 LOAD_MORE_DOCUMENTS,
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
 REMOVE_DOCUMENT_TAG_SUCESS,
 TOOGLE_DOCUMENT_TAG_SUCESS,
 TOOGLE_DOCUMENT_TAG_ERROR,
 LOAD_PROFILES,
 LOAD_PROFILES_SUCCESS,
 LOAD_PROFILES_ERROR,
 ADD_DOCCUMENT_TO_PROFILE,
 ADD_DOCCUMENT_TO_PROFILE_SUCCESS,
 ADD_DOCCUMENT_TO_PROFILE_ERROR,
 REMOVE_DOCCUMENT_FROM_PROFILE,
 REMOVE_DOCCUMENT_FROM_PROFILE_SUCCESS,
 REMOVE_DOCCUMENT_FROM_PROFILE_ERROR,
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

export function removeDocumentTagScuess(respond, tag, documentID) {
  return {
    type: REMOVE_DOCUMENT_TAG_SUCESS,
    respond,
    tag,
    documentID,
  };
}

export function toogleDocumentTagScuess(respond, tag, documentID) {
  return {
    type: TOOGLE_DOCUMENT_TAG_SUCESS,
    respond,
    tag,
    documentID,
  };
}

export function toogleDocumentTagError(error) {
  return {
    type: TOOGLE_DOCUMENT_TAG_ERROR,
    error,
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

export function profilesLoadingError(error) {
  return {
    type: LOAD_PROFILES_ERROR,
    error,
  };
}

export function addDocumentToProfile(document, profileID) {
  return {
    type: ADD_DOCCUMENT_TO_PROFILE,
    document,
    profileID,
  };
}

export function addDocumentToProfileSucess(respond, profileID) {
  return {
    type: ADD_DOCCUMENT_TO_PROFILE_SUCCESS,
    profileID,
  };
}

export function addDocumentToProfileError(error, profileID) {
  return {
    type: ADD_DOCCUMENT_TO_PROFILE_ERROR,
    profileID,
  };
}

export function removeDocumentFromProfile(document, profileID) {
  return {
    type: REMOVE_DOCCUMENT_FROM_PROFILE,
    document,
    profileID,
  };
}

export function removeDocumentFromProfileSucess(respond, profileID) {
  return {
    type: REMOVE_DOCCUMENT_FROM_PROFILE_SUCCESS,
    document,
    profileID,
  };
}

export function removeDocumentFromProfileError(error, profileID) {
  return {
    type: REMOVE_DOCCUMENT_FROM_PROFILE_ERROR,
    error,
    profileID,
  };
}
