/*
 *
 * TimelinePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import flatten from 'lodash/flatten';
import { loadDocuments, loadEvents } from './actions';
import { selectDocuments, selectEvents, selectLoading, selectError } from './selectors';
import styles from './styles.css';

const timeStamps = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function getTimeInMins(time) {
  return (time.getHours() * 60) + time.getMinutes();
}

function getFrequentWords(keywords, maxNumber) {
  const frequencies = {};
  for (const word of keywords) {
    frequencies[word] = frequencies[word] || 0;
    frequencies[word]++;
  }
  const words = Object.keys(frequencies);
  const wordsRankedByFrequent = words.sort((a, b) => frequencies[b] - frequencies[a]).slice(0, maxNumber);
  return wordsRankedByFrequent;
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
  }
  onMouseEnterEventCircleHandler() {

  }
  onMouseLeaveEventCircleHandler() {

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
    const walkStartStopEvents = events.filter((event) => {
      if (event.activityType === 'walkstartstop') {
        return true;
      }
      return false;
    });
    const rawDataMarginTop = '-8';
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <div className={styles.timePointsWrapper}>
            {events.map((event) => {
              const time = new Date(event.start);
              const timeInMinute = getTimeInMins(time);
              const timeInPercent = (timeInMinute / 1440) * 100;
              if (event.activityType === 'steps') {
                return (
                  <div
                    className={styles.period}
                    key={event.id}
                    style={{
                      left: `${timeInPercent}%`,
                      width: `${(event.duration / (1440 * 60)) * 100}%`,
                      height: `${event.value}px`,
                      top: `-${event.value - 8}px`,
                      marginTop: `${rawDataMarginTop}%`,
                    }}
                  >
                  </div>
                );
              }
              if (event.activityType === 'heart') {
                return (
                  <div
                    className={styles.period}
                    key={event.id}
                    style={{
                      left: `${timeInPercent}%`,
                      width: '1px',
                      height: '5px',
                      background: `hsl(${100 - (event.value / 1.4)}, 100%, 50%)`,
                      marginTop: `${rawDataMarginTop}%`,
                    }}
                  >
                  </div>
                );
              }
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
            })}
            {walkStartStopEvents.map((walkStartStopEvent, index) => {
              if (walkStartStopEvent.value === 0 && walkStartStopEvent && walkStartStopEvents[index + 1]) {
                const startTime = getTimeInMins(new Date(walkStartStopEvent.start)) / 14.4;
                const endTime = getTimeInMins(new Date(walkStartStopEvents[index + 1].start)) / 14.4;
                const walkingDuration = endTime - startTime;
                const workingEventsTags = flatten(this.props.events.filter((event) => {
                  const eventTime = getTimeInMins(new Date(event.start)) / 14.4;
                  if (startTime < eventTime && eventTime < endTime && event.activityType !== 'heart' && event.activityType !== 'steps' && event.activityType !== 'walkstartstop') {
                    return true;
                  }
                  return false;
                }).map((event) => {
                  if (event.targettedResource && event.targettedResource.tags) {
                    return event.targettedResource.tags.map((tag) => tag.text);
                  }
                  return null;
                }));
                const mostUsed = getFrequentWords(workingEventsTags, 8);
                if (walkStartStopEvent.activityType === 'walkstartstop' && walkStartStopEvent.timeCreated > 1472731258847) {
                  return (
                    <div
                      className={styles.period}
                      key={walkStartStopEvent.id}
                      style={{
                        background: `${mostUsed.length > 0 ? 'rgba(0, 255, 205, 1)' : 'rgba(0, 255, 205, 0.2)'}`,
                        marginTop: '1%',
                        left: `${startTime}%`,
                        width: `${walkingDuration}%`,
                        height: '400%',
                      }}
                    >
                      <div
                        className={styles.workingKeywordWrapper}
                        style={{
                          width: `${walkingDuration}%`,
                        }}
                      >
                        {mostUsed.map((word, wIndex) => <span className={styles.workingKeyword} key={`word ${wIndex}`}>{word} </span>)}
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
            {timeStamps.map((time, index) => <div className={styles.timeStamp} key={`time ${index}`} style={{ left: `${(100 / 24) * index}%` }}><br /><br />{time}</div>)}
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
