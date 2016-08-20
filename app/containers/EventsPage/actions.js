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

export function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    event,
  };
}

export function deleteEventError(error) {
  return {
    type: DELETE_EVENT_ERROR,
    error,
  };
}

export function deleteEventSucess(respond) {
  return {
    type: DELETE_EVENT_SUCESS,
    respond,
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

export function toogleEventTagScuess(respond) {
  return {
    type: TOOGLE_EVENT_TAG_SUCESS,
    respond,
  };
}

export function toogleEventTagError(error) {
  return {
    type: TOOGLE_EVENT_TAG_ERROR,
    error,
  };
}
