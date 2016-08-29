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
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_ERROR,
  CLICK_EVENT_CARD,
  DELETE_EVENT,
  DELETE_EVENT_SUCESS,
  DELETE_EVENT_ERROR,
  CLICK_EVENT_TAG,
  TOOGLE_EVENT_TAG_SUCESS,
  TOOGLE_EVENT_TAG_ERROR,
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

export function deleteEventError(error, eventID) {
  return {
    type: DELETE_EVENT_ERROR,
    error,
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

export function toogleEventTagScuess(respond, tag) {
  return {
    type: TOOGLE_EVENT_TAG_SUCESS,
    respond,
    tag,
  };
}

export function toogleEventTagError(error) {
  return {
    type: TOOGLE_EVENT_TAG_ERROR,
    error,
  };
}
