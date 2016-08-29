/*
 *
 * EventsPage
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEvents, selectLoading, selectError } from './selectors';
import { loadEvents, clickOnEventCard, deleteEvent, clickOnEventTag } from './actions';
import requiresAuth from 'containers/RequiresAuth';
import EntitiesList from 'components/EntitiesList';

export class EventsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    events: React.PropTypes.array,
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    loadEvents: React.PropTypes.func,
    clickOnEventCard: React.PropTypes.func,
    deleteEvent: React.PropTypes.func,
    clickOnEventTag: React.PropTypes.func,
  }
  render() {
    return (
      <EntitiesList
        entities={this.props.events}
        loading={this.props.loading}
        error={this.props.error}
        initEntitiesList={this.props.loadEvents}
        clickOnEntityCard={this.props.clickOnEventCard}
        clickOnEntityDelete={this.props.deleteEvent}
        clickOnEntityTag={this.props.clickOnEventTag}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: selectEvents(),
  loading: selectLoading(),
  error: selectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: bindActionCreators(loadEvents, dispatch),
    clickOnEventCard: bindActionCreators(clickOnEventCard, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    clickOnEventTag: bindActionCreators(clickOnEventTag, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(EventsPage));
