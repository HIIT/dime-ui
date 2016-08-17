/*
 *
 * EventsList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectEventsList from './selectors';
import EntitiesList from 'containers/EntitiesList';
import { createStructuredSelector } from 'reselect';
import { loadEvents } from './actions';

export class EventsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    events: React.PropTypes.array,
    loadEvents: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.loadEvents();
  }
  render() {
    return (
      <EntitiesList entities={this.props.events} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: selectEventsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: () => dispatch(loadEvents()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
