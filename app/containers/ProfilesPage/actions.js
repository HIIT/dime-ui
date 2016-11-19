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
 SAVE_PROFILE_NAME,
 SAVE_PROFILE_NAME_SUCCESS,
 SAVE_PROFILE_NAME_ERROR,
 DELETE_PROFILE,
 DELETE_PROFILE_SUCCESS,
 DELETE_PROFILE_ERROR,
 CLICK_ON_PROFILE_TAG,
 ADD_TAG_TO_PROFILE,
 ADD_TAG_TO_PROFILE_SUCCESS,
 ADD_TAG_TO_PROFILE_ERROR,
 DELETE_TAG_FROM_PROFILE,
 DELETE_TAG_FROM_PROFILE_SUCCESS,
 DELETE_TAG_FROM_PROFILE_ERROR,
 SEARCH_PROFILES,
 SEARCH_PROFILES_SUCCESS,
 SEARCH_PROFILES_ERROR,
 CLICK_ON_ENTITY,
 CLICK_ON_ENTITY_TAG,
 CLICK_ON_ENTITY_DELETE,
 DELETE_ENTITY_FROM_PROFILE_SUCCESS,
 DELETE_ENTITY_FROM_PROFILE_ERROR,
 ENTITY_STATE_TOGGLE,
 ENTITY_STATE_TOGGLE_SUCCESS,
 ENTITY_STATE_TOGGLE_ERROR,
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
* Save actions
*
*/

export function saveProfileName(name, profileID) {
  return {
    type: SAVE_PROFILE_NAME,
    name,
    profileID,
  };
}

export function saveProfileNameSuccess(respond, name, profileID) {
  return {
    type: SAVE_PROFILE_NAME_SUCCESS,
    name,
    profileID,
  };
}

export function saveProfileNameError(error, name, profileID) {
  return {
    type: SAVE_PROFILE_NAME_ERROR,
    error,
    name,
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
* Click On Profile Tag
*
*/

export function clickOnProfileTag(tag) {
  return {
    type: CLICK_ON_PROFILE_TAG,
    tag,
  };
}

export function addTagToProfile(tag, profileID) {
  return {
    type: ADD_TAG_TO_PROFILE,
    tag,
    profileID,
  };
}

export function addTagToProfileSuccess(respond, profileID) {
  return {
    type: ADD_TAG_TO_PROFILE_SUCCESS,
    respond,
    profileID,
  };
}

export function addTagToProfileError(error, profileID) {
  return {
    type: ADD_TAG_TO_PROFILE_ERROR,
    error,
    profileID,
  };
}

export function deleteTagFromProfile(tag, profileID) {
  return {
    type: DELETE_TAG_FROM_PROFILE,
    tag,
    profileID,
  };
}

export function deleteTagFromProfileSuccess(respond, tagID, profileID) {
  return {
    type: DELETE_TAG_FROM_PROFILE_SUCCESS,
    respond,
    tagID,
    profileID,
  };
}

export function deleteTagFromProfileError(error, tagID, profileID) {
  return {
    type: DELETE_TAG_FROM_PROFILE_ERROR,
    error,
    tagID,
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
export function clickOnEntityTag(tag, entityID, profileID) {
  return {
    type: CLICK_ON_ENTITY_TAG,
    tag: {
      '@type': 'Tag',
      text: tag.text,
    },
    entityID,
    profileID,
  };
}

/*
*
* Click on Entity Delete
*
*/
export function clickOnEntityDelete(entityID, entityType, profileID) {
  return {
    type: CLICK_ON_ENTITY_DELETE,
    entityID,
    entityType,
    profileID,
  };
}

export function deleteEntityFromProfileSuccess(respond, entityID, entityType, profileID) {
  return {
    type: DELETE_ENTITY_FROM_PROFILE_SUCCESS,
    respond,
    entityType,
    entityID,
    profileID,
  };
}

export function deleteEntityFromProfileError(error, entityID, entityType, profileID) {
  return {
    type: DELETE_ENTITY_FROM_PROFILE_ERROR,
    error,
    entityType,
    entityID,
    profileID,
  };
}

export function clickOnEntityStateToggle(entity, entityType, profileID) {
  return {
    type: ENTITY_STATE_TOGGLE,
    entity,
    entityType,
    profileID,
  };
}

export function entityStateToggleScuess(respond, entityID, preEntityType, afterEntityType, profileID) {
  return {
    type: ENTITY_STATE_TOGGLE_SUCCESS,
    respond,
    entityID,
    preEntityType,
    afterEntityType,
    profileID,
  };
}

export function entityStateToggleError(error) {
  return {
    type: ENTITY_STATE_TOGGLE_ERROR,
    error,
  };
}
/*
*
* Click on Entity
*
*/
export function clickOnEntity(entity, entityType, profileID) {
  return {
    type: CLICK_ON_ENTITY,
    entity,
    entityType,
    profileID,
  };
}
