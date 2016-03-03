import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import moment from 'moment'

import { fetchEvents } from '../actions/index.js'

class EventsList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.events.map( (event) => {
                    return (
                        <div key={event.id} className="card">
                            <div className="card-header">
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
                })}
            </div>
        )
    }
    componentDidMount() {
        this.props.dispatch(fetchEvents())
    }
}

function mapStateToProps(state) {
    return { events: state.events }
}

export default connect(mapStateToProps)(EventsList)