/*
 *
 * EventsPage
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEvents, selectProfiles } from './selectors';
import {
  loadEvents, searchEvent, clickOnEventCard, deleteEvent, clickOnEventTag,
  loadProfiles, addEventToProfile, removeEventFromProfile,
} from './actions';
import requiresAuth from 'containers/RequiresAuth';
import EntitiesList from 'components/EntitiesList';

export class EventsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    events: React.PropTypes.array,
    loadEvents: React.PropTypes.func,
    searchEvent: React.PropTypes.func,
    clickOnEventCard: React.PropTypes.func,
    deleteEvent: React.PropTypes.func,
    clickOnEventTag: React.PropTypes.func,
    profiles: React.PropTypes.array,
    loadProfiles: React.PropTypes.func,
    addToProfile: React.PropTypes.func,
    removeFromProfile: React.PropTypes.func,
  }
  render() {
    return (
      <EntitiesList
        entities={this.props.events}
        initEntitiesList={this.props.loadEvents}
        search={this.props.searchEvent}
        clickOnEntityCard={this.props.clickOnEventCard}
        clickOnEntityDelete={this.props.deleteEvent}
        clickOnEntityTag={this.props.clickOnEventTag}
        profiles={this.props.profiles}
        loadProfiles={this.props.loadProfiles}
        addToProfile={this.props.addToProfile}
        removeFromProfile={this.props.removeFromProfile}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: selectEvents(),
  profiles: selectProfiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: bindActionCreators(loadEvents, dispatch),
    searchEvent: bindActionCreators(searchEvent, dispatch),
    clickOnEventCard: bindActionCreators(clickOnEventCard, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    clickOnEventTag: bindActionCreators(clickOnEventTag, dispatch),
    loadProfiles: bindActionCreators(loadProfiles, dispatch),
    addToProfile: bindActionCreators(addEventToProfile, dispatch),
    removeFromProfile: bindActionCreators(removeEventFromProfile, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(EventsPage));
