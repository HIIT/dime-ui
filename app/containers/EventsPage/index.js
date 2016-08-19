/*
 *
 * EventsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import requiresAuth from 'containers/RequiresAuth';
import EventsList from 'containers/EventsList';

export class EventsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <EventsList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(requiresAuth(EventsPage));
