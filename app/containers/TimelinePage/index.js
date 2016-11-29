/*
 *
 * TimelinePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import DatePicker from 'material-ui/DatePicker';
import flatten from 'lodash/flatten';
import { loadDocuments, loadEvents } from './actions';
import { selectDocuments, selectEvents } from './selectors';
import styles from './styles.css';

// const timeStamps = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function getTimeInMins(time) {
  return (time.getHours() * 60) + time.getMinutes();
}

function getTimeInPercentage(time, total) {
  const t = new Date(time);
  const seconds = t.getSeconds();
  const hoursInSec = t.getHours() * 60 * 60;
  const minInSec = t.getMinutes() * 60;
  return ((hoursInSec + minInSec + seconds) / total);
}

function getDurationInPercentage(durationInSec, total) {
  return (durationInSec / total);
}

function getFrequentWords(keywords, maxNumber) {
  const frequencies = {};
  for (const word of keywords) {
    frequencies[word] = frequencies[word] || 0;
    frequencies[word] += 1;
  }
  const words = Object.keys(frequencies);
  const wordsRankedByFrequent = words.sort((a, b) => frequencies[b] - frequencies[a]).slice(0, maxNumber);
  return wordsRankedByFrequent;
}

export class TimelinePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    events: React.PropTypes.array,
    loadEvents: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.loadEvents();
  }
  onMouseEnterEventCircleHandler() {

  }
  onMouseLeaveEventCircleHandler() {

  }
  renderStepEvent(event, total = 86400) {
    return (
      <div
        key={event.id}
        className={styles.stepEventUnit}
        style={{
          left: `${getTimeInPercentage(event.start, total) * 100}%`,
          width: `${getDurationInPercentage(event.duration, total) * 100}%`,
        }}
      >
        <div
          className={styles.stepEventBar}
          style={{
            height: `${event.value / 4}vh`,
          }}
        >
        </div>
        <div
          className={styles.stepEventInfo}
          style={{
            height: `${event.value / 4}vh`,
          }}
        >
          {event.value} <span className={styles.stepUnit}>steps</span>
        </div>
      </div>

    );
  }
  renderHeartEvent(event, total = 86400) {
    return (
      <div
        className={styles.heartEventUnit}
        key={event.id}
        style={{
          left: `${getTimeInPercentage(event.start, total) * 100}%`,
          width: `${getDurationInPercentage(event.duration, total) * 100}%`,
          background: `hsl(${100 - (event.value / 1.4)}, 100%, 50%)`,
        }}
      >
      </div>
    );
  }
  renderEvent = (event, rawDataMarginTop) => {
    const time = new Date(event.start);
    const timeInMinute = getTimeInMins(time);
    const timeInPercent = (timeInMinute / 1440) * 100;
    return (
      <div
        className={styles.point}
        key={event.id}
        style={{
          left: `${timeInPercent}%`,
          marginTop: `${rawDataMarginTop - 2}%`,
        }}
        onMouseEnter={this.onMouseEnterEventCircleHandler}
        onMouseLeave={this.onMouseLeaveEventCircleHandler}
      >
      </div>
    );
  }
  renderTimeSegmentKeywords(word, wIndex) {
    return (
      <span className={styles.timeSegmentKeywords} key={`word ${wIndex}`}>{word} </span>
    );
  }
  renderTimeSegment = (walkStartStopEvent, index, walkStartStopEvents, normalEvents) => {
    if (!walkStartStopEvents[index + 1]) {
      return null;
    }
    const startTime = getTimeInMins(new Date(walkStartStopEvent.start)) / 14.4;
    const endTime = getTimeInMins(new Date(walkStartStopEvents[index + 1].start)) / 14.4;
    const walkingDuration = endTime - startTime;
    const workingEventsTags = flatten(normalEvents.filter((event) => {
      const eventTime = getTimeInMins(new Date(event.start)) / 14.4;
      if (endTime < eventTime && eventTime < startTime) {
        return true;
      }
      return false;
    }).map((event) => {
      if (event.targettedResource && event.targettedResource.tags) {
        return event.targettedResource.tags.map((tag) => tag.text);
      }
      return event.tags;
    }));
    const mostFrquentTagsInTimeSegment = getFrequentWords(workingEventsTags, 10);
    return (
      <div
        className={styles.period}
        key={walkStartStopEvent.id}
        style={{
          background: `${mostFrquentTagsInTimeSegment.length > 0 ? 'rgba(0, 255, 205, 0.08)' : 'rgba(0, 255, 205, 0.03)'}`,
          marginTop: '1%',
          left: `${startTime}%`,
          width: `${walkingDuration}%`,
          height: '400%',
        }}
      >
        {mostFrquentTagsInTimeSegment.map((word, wIndex) => this.renderTimeSegmentKeywords(word, wIndex))}
      </div>
    );
  }
  renderTags(event) {
    if (event.targettedResource && event.targettedResource.tags) {
      const tags = event.targettedResource.tags;
      return (
        <div>
          {tags.map((tag) => <span className={styles.pointText} key={tag.id}> { tag.text } </span>)}
        </div>
      );
    }
    return null;
  }
  render() {
    const { events } = this.props;
    // const walkStartStopEvents = events.filter((event) => event.activityType === 'walkstartstop');
    const stepEvents = events.filter((event) => event.activityType === 'steps');
    const heartEvents = events.filter((event) => event.activityType === 'heart');
    // const normalEvents = events.filter((event) => !event.activityType);
    // const rawDataMarginTop = '-8';
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.line}>
        </div>
        <div className={styles.stepEventsWrapper}>
          {stepEvents.map((event) => this.renderStepEvent(event))}
        </div>
        <div className={styles.heartEventsWrapper}>
          {heartEvents.map((event) => this.renderHeartEvent(event))}
        </div>
        {/* <div className={styles.normalEventsWrapper}>
          {normalEvents.map((event) => this.renderEvent(event))}
        </div>
        <div className={styles.timeSegmentWrapper}>
          {walkStartStopEvents.map((event, index, array) => this.renderTimeSegment(event, index, array, normalEvents))}
        </div>
        <div className={styles.timeStampsWrapper}>
          {timeStamps.map((time, index) =>
            <div
              className={styles.timeStamp}
              key={`time ${index}`}
              style={{ left: `${(100 / 24) * index}%` }}
            >
              {time}
            </div>)
          }
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  documents: selectDocuments(),
  events: selectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadDocuments: bindActionCreators(loadDocuments, dispatch),
    loadEvents: bindActionCreators(loadEvents, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
