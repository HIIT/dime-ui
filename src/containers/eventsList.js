import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import moment from 'moment'
import Transition from 'react-motion-ui-pack'

import Tags from '../containers/tags'
import ConfirmedTags from '../containers/confirmedTags'
import { fetchEvents } from '../actions/index'
import { setModalOpen,  setModalClose } from '../actions/index'
import { purify } from '../services/purifyText'

export const eventCard = {
    cursor: 'pointer',
    wordWrap: 'break-word',
}
export const eventCardPlainText = {
    fontSize: '9px',
    color: 'rgba(0,0,0,0.2)'
}
export const eventCardPlainTextSpan = {
}
export const eventCardHeader = {
    padding: '5px 10px 5px 10px'
}
export const eventCardHeaderTitle = {
    fontSize: '12px'
}
export const eventCardHeaderSpan = {
    fontSize: '9px'
}
export const eventCardHeaderUrl = {
    fontSize: '9px',
}
export const blur = {
    WebkitFilter: 'blur(2px)',
    MozFilter: 'blur(2px)',
    OFilter: 'blur(2px)',
    MsFilter: 'blur(2px)',
    filter: 'blur(2px)',
    opacity: 0.6
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
    handleClickOnEvent(index, mouseEvent) {
        let posY = mouseEvent.nativeEvent.screenY
        this.props.setModalOpen(index, posY)
    }
    handleClick() {
        console.log('clikc')
        this.props.setModalClose(this.props.modal.eventIndex)
    }
    render() {
        return (
            <div
                style={this.props.modal.isOpen ? blur : null}
                onClick={this.props.modal.isOpen ? this.handleClick : null}
            >
                    {this.props.events.map( (event, index) => {
                        return (
                            <div
                                 className="row"
                                 key={index}
                            >
                                <div className="col-xs-2 col-xs-offset-1 clearfix">
                                    <Tags eventIndex={index}/>
                                </div>
                                <div
                                    className="col-xs-6"
                                    onClick={(mouseEvent) => this.handleClickOnEvent(index, mouseEvent)}
                                >
                                    {this.eventCardRender(event, index)}
                                </div>
                                <div className="col-xs-2 clearfix">
                                    <ConfirmedTags eventIndex={index}/>
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        events: state.events,
        modal: state.modal
    }
}

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators({fetchEvents}, dispatch )
//}
//export default connect(mapStateToProps, mapDispatchToProps)(EventsList)
export default connect(mapStateToProps, { fetchEvents, setModalOpen, setModalClose })(EventsList)
