/*
 *
 * EventsPage actions
 *
 */

/*
*
* EventsList actions
*
*/

import {
  LOAD_EVENTS,
  LOAD_MORE_EVENTS,
  LOAD_EVENTS_SUCCESS,
  SEARCH_EVENTS,
  SEARCH_EVENTS_SUCCESS,
  CLICK_EVENT_CARD,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  CLICK_EVENT_TAG,
  TOGGLE_EVENT_TAG_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
  ADD_EVENT_TO_PROFILE,
  ADD_EVENT_TO_PROFILE_SUCCESS,
  REMOVE_EVENT_FROM_PROFILE,
  REMOVE_EVENT_FROM_PROFILE_SUCCESS,
} from './constants';

export function loadEvents() {
  return {
    type: LOAD_EVENTS,
  };
}

export function loadMoreEvents(nextPageNumber) {
  return {
    type: LOAD_MORE_EVENTS,
    nextPageNumber,
  };
}

export function eventsLoaded(events) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    events,
  };
}

/*
 *
 * Search actions
 *
 */
export function searchEvent(keyword) {
  return {
    type: SEARCH_EVENTS,
    keyword,
  };
}

export function searchEventLoaded(events) { // DiMe EventSearch will return documents
  return {
    type: SEARCH_EVENTS_SUCCESS,
    events,
  };
}

/*
 *
 * EventCard actions
 *
 */

export function clickOnEventCard(event) {
  return {
    type: CLICK_EVENT_CARD,
    event,
  };
}

export function deleteEvent(eventID) {
  return {
    type: DELETE_EVENT,
    eventID,
  };
}

export function deleteEventSuccess(respond, eventID) {
  return {
    type: DELETE_EVENT_SUCCESS,
    respond,
    eventID,
  };
}

/*
 *
 * EventsTagsList actions
 *
 */

export function clickOnEventTag(tag, eventID) {
  return {
    type: CLICK_EVENT_TAG,
    tag,
    eventID,
  };
}

export function toggleEventTagSuccess(respond, tag, eventID) {
  return {
    type: TOGGLE_EVENT_TAG_SUCCESS,
    respond,
    tag,
    eventID,
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

export function addEventToProfile(event, profileID) {
  return {
    type: ADD_EVENT_TO_PROFILE,
    event,
    profileID,
  };
}

export function addEventToProfileSuccess(respond, profileID) {
  return {
    type: ADD_EVENT_TO_PROFILE_SUCCESS,
    respond,
    profileID,
  };
}

export function removeEventFromProfile(Event, profileID) {
  return {
    type: REMOVE_EVENT_FROM_PROFILE,
    Event,
    profileID,
  };
}

export function removeEventFromProfileSuccess(respond, profileID) {
  return {
    type: REMOVE_EVENT_FROM_PROFILE_SUCCESS,
    event,
    profileID,
  };
}
