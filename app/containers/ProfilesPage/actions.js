/*
 *
 * ProfilesPage actions
 *
 */

import {
 LOAD_PROFILES,
 LOAD_PROFILES_SUCCESS,
 CREATE_PROFILE,
 CREATE_PROFILE_SUCCESS,
 EDIT_PROFILE,
 CANCEL_EDIT_PROFILE,
 SAVE_PROFILE_NAME,
 SAVE_PROFILE_NAME_SUCCESS,
 DELETE_PROFILE,
 DELETE_PROFILE_SUCCESS,
 ADD_ATTRIBUTE_TO_PROFILE,
 ADD_ATTRIBUTE_TO_PROFILE_SUCCESS,
 EDIT_ATTRIBUTE_TO_PROFILE,
 EDIT_ATTRIBUTE_TO_PROFILE_SUCCESS,
 EDIT_ATTRIBUTE_TO_PROFILE_ERROR,
 DELETE_ATTRIBUTE_FROM_PROFILE,
 DELETE_ATTRIBUTE_FROM_PROFILE_SUCCESS,
 CLICK_ON_PROFILE_TAG,
 ADD_TAG_TO_PROFILE,
 ADD_TAG_TO_PROFILE_SUCCESS,
 DELETE_TAG_FROM_PROFILE,
 DELETE_TAG_FROM_PROFILE_SUCCESS,
 SEARCH_PROFILES,
 SEARCH_PROFILES_SUCCESS,
 CLICK_ON_ENTITY,
 CLICK_ON_ENTITY_TAG,
 CLICK_ON_ENTITY_DELETE,
 DELETE_ENTITY_FROM_PROFILE_SUCCESS,
 ENTITY_STATE_TOGGLE,
 ENTITY_STATE_TOGGLE_SUCCESS,
 CLICK_ON_SEND_TO_PEOPLE_FINDER,
 SEND_TO_PEOPLE_FINDER_SUCCESS,
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

export function clickOnSendToPeopleFinder(profileID) {
  return {
    type: CLICK_ON_SEND_TO_PEOPLE_FINDER,
    profileID,
  };
}

export function sendToPeopleFinderSuccess(profileID) {
  return {
    type: SEND_TO_PEOPLE_FINDER_SUCCESS,
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

/*
* Click On Profile Attribute
*/

export function addAttributeToProfile(attributeKey, attributeValue, profileID) {
  return {
    type: ADD_ATTRIBUTE_TO_PROFILE,
    attributeKey,
    attributeValue,
    profileID,
  };
}

export function addAttributeToProfileSuccess(respond, profileID) {
  return {
    type: ADD_ATTRIBUTE_TO_PROFILE_SUCCESS,
    respond,
    profileID,
  };
}

export function editAttributeFromProfile(attributeKey, attributeValue, profileID) {
  return {
    type: EDIT_ATTRIBUTE_TO_PROFILE,
    attributeKey,
    attributeValue,
    profileID,
  };
}

export function editAttributeFromProfileSuccess(respond, profileID) {
  return {
    type: EDIT_ATTRIBUTE_TO_PROFILE_SUCCESS,
    respond,
    profileID,
  };
}

export function editAttributeFromProfileError(respond, profileID) {
  return {
    type: EDIT_ATTRIBUTE_TO_PROFILE_ERROR,
    respond,
    profileID,
  };
}

export function deleteAttributeFromProfile(attributeKey, profileID) {
  return {
    type: DELETE_ATTRIBUTE_FROM_PROFILE,
    attributeKey,
    profileID,
  };
}

export function deleteAttributeFromProfileSuccess(respond, attributeKey, profileID) {
  return {
    type: DELETE_ATTRIBUTE_FROM_PROFILE_SUCCESS,
    respond,
    attributeKey,
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
