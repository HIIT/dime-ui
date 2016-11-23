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
  DELETE_EVENT_SUCESS,
  CLICK_EVENT_TAG,
  TOOGLE_EVENT_TAG_SUCESS,
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

export function deleteEventSucess(respond, eventID) {
  return {
    type: DELETE_EVENT_SUCESS,
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

export function toogleEventTagScuess(respond, tag, eventID) {
  return {
    type: TOOGLE_EVENT_TAG_SUCESS,
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

export function addEventToProfileSucess(respond, profileID) {
  return {
    type: ADD_EVENT_TO_PROFILE_SUCCESS,
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

export function removeEventFromProfileSucess(respond, profileID) {
  return {
    type: REMOVE_EVENT_FROM_PROFILE_SUCCESS,
    event,
    profileID,
  };
}
