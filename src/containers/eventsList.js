import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import moment from 'moment'

import { fetchEvents } from '../actions/index.js'

const overflowHiddenBox = {
    width: '100%',
    height: '730px',
    overflow: 'hidden',
    marginTop: '-270px'
};

const overflowHiddenContent = {
    width: '103%',
    overflowX: 'hidden',
    overflowY:'auto',
    height: '730px'

}

const eventCard = {
    cursor: 'pointer'
}
const tagStyle = {
    marginLeft: '2px',
    marginBottom: '2px'
}

class EventsList extends Component {
    componentWillMount() {
        this.props.fetchEvents()
    }
    tagsRender(event) {
        return (
            event.targettedResource.tags.map( (tag)=> {
                return (
                    <span key={tag.time}
                          className="label label-info pull-xs-right"
                          style={tagStyle}
                    >
                    {tag.text}
                </span>
                )
            })
        )
    }
    eventCardRender(event) {
        return (
            <div className="card" style={eventCard}>
                <div className="card-header clearfix">
                    <b>UsageEvent: </b>
                    <span>{event.actor}</span>
                    <a className="pull-xs-right" href={`event?id=${event.id}`}>
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
                </div>
            </div>
        )
    }
    render() {
        return (
            <div style={overflowHiddenBox}>
                <div style={overflowHiddenContent}>
                    {this.props.events.map( (event) => {
                        return (
                            <div className="row" key={event.id}>
                                <div className="col-xs-2 col-xs-offset-1 clearfix">
                                    {this.tagsRender(event)}
                                </div>
                                <div className="col-xs-6">
                                    {this.eventCardRender(event)}
                                </div>
                                <div className="col-xs-2">

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
