/*
 *
 * TimelinePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadDocuments, loadEvents } from './actions';
import { selectDocuments, selectEvents, selectLoading, selectError } from './selectors';
import styles from './styles.css';

const timeStamps = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function getTimeInMins(time) {
  return (time.getHours() * 60) + time.getMinutes();
}
export class TimelinePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    events: React.PropTypes.array,
    documents: React.PropTypes.array,
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    loadDocuments: React.PropTypes.func,
    loadEvents: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.loadEvents();
    this.props.loadDocuments();
  }
  render() {
    const { events } = this.props;
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <div className={styles.timePointsWrapper}>
            {events.map((event, index) => {
              const time = new Date(event.start);
              const timeInMinute = getTimeInMins(time);
              const timeInPercent = (timeInMinute / 1440) * 100;
              if (index > 0 && index < (events.length - 1)) {
                const room = Math.abs(timeInMinute - getTimeInMins(new Date(events[index - 1].start))) + Math.abs(timeInMinute - getTimeInMins(new Date(events[index + 1].start)));
                const max = 10;
                const marginTopDistance = max - room;
                return (
                  <div className={styles.point} key={event.id} style={{ left: `${timeInPercent}%` }}></div>
                );
              }
              return (
                <div className={styles.point} key={event.id} style={{ left: `${timeInPercent}%` }}></div>
              );
            })}
            {timeStamps.map((time, index) => <div className={styles.timeStamp} key={`time ${index}`} style={{ left: `${(100 / 24) * index}%` }}> {time}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  documents: selectDocuments(),
  events: selectEvents(),
  loading: selectLoading(),
  error: selectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadDocuments: bindActionCreators(loadDocuments, dispatch),
    loadEvents: bindActionCreators(loadEvents, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
