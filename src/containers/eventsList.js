import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import moment from 'moment'
import Transition from 'react-motion-ui-pack'

import Tags from '../containers/tags'
import ConfirmedTags from '../containers/confirmedTags'
import { fetchEvents } from '../actions/index'
import { purify } from '../services/purifyText'

const overflowHiddenBox = {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    position: 'absolute',
    top: '0px',
    left: '0vw'
};

const overflowHiddenContent = {
    width: '103%',
    overflowX: 'hidden',
    overflowY:'auto',
    height: '100vh'
}

const eventCard = {
    cursor: 'pointer',
    wordWrap: 'break-word',
}

const eventCardPlainText = {
    fontSize: '9px',
    color: 'rgba(0,0,0,0.2)'
}

const eventCardPlainTextSpan = {
}

const eventCardHeader = {
    padding: '5px 10px 5px 10px'
}

const eventCardHeaderTitle = {
    fontSize: '12px'
}

const eventCardHeaderSpan = {
    fontSize: '9px'
}

const eventCardHeaderUrl = {
    fontSize: '9px',
}

class EventsList extends Component {
    componentWillMount() {
        this.props.fetchEvents()
    }
    eventCardRender(event, index) {
        return (
            <Transition
                component="false"
                appear={{
                    height: 0,
                    opacity: 0
                 }}
                enter={{
                    height: 'auto',
                    opacity: 1,
                  }}
                leave={{
                    height: 0,
                    opacity: 0
                 }}
            >
            <div className="card" style={eventCard} key={index}>
                <div className="card-header clearfix" style={eventCardHeader}>
                    <span style={eventCardHeaderSpan}>From: </span>
                    <b style={eventCardHeaderTitle}>{event.actor}</b>
                    <a className="pull-xs-right" href={`event?id=${event.id}`} style={eventCardHeaderUrl}>
                        {`${moment(event.timeCreated).format('MMMM Do YYYY, HH:mm:ss.SSS')}`}
                    </a>
                </div>
                <div className="card-block">
                    <b>
                        {event.targettedResource.type.substring(event.targettedResource.type.indexOf('#')+1, event.targettedResource.type.length)}
                    </b>
                    <span> </span>
                    <a className="" href={`${event.targettedResource.uri}`}>
                        {event.targettedResource.title}
                    </a>
                    <p style={eventCardPlainText}>
                        {purify(event.targettedResource.plainTextContent).map((text, index) => {
                                return (
                                    <span style={eventCardPlainTextSpan} key={index}>{text} </span>
                                )
                            }
                        )}
                    </p>
                </div>
            </div>
            </Transition>
        )
    }
    render() {
        return (
            <div style={overflowHiddenBox}>
                <div style={overflowHiddenContent}>
                    {this.props.events.map( (event, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-xs-2 col-xs-offset-1 clearfix">
                                    <Tags eventIndex={index}/>
                                </div>
                                <div className="col-xs-6">
                                    {this.eventCardRender(event, index)}
                                </div>
                                <div className="col-xs-2">
                                    <ConfirmedTags eventIndex={index}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { events: state.events }
}

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators({fetchEvents}, dispatch )
//}
//export default connect(mapStateToProps, mapDispatchToProps)(EventsList)
export default connect(mapStateToProps, { fetchEvents })(EventsList)
