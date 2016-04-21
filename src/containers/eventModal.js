import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Transition from 'react-motion-ui-pack'
import moment from 'moment'


import { setModalClose } from '../actions/index.js'
import { eventCardHeaderSpan, eventCardHeaderTitle, eventCardHeaderUrl, eventCardPlainText, eventCardPlainTextSpan} from './eventsList'
import { purify } from '../services/purifyText'
import AnimatedTags from '../containers/animatedTags'
import AnimatedConfirmedTags from '../containers/animatedConfirmedTags'

const modalStyle = {
    top: '8vh',
    display: 'block'
}

const modalWrapper = {
    background: 'transparent'
};

const TagsColSpace = {
    color: 'transparent',
    paddingBottom: '10px'
}
const TagsCol = {

}

class EventModal extends Component {
    handleClose() {
        this.props.setModalClose(this.props.modal.eventIndex)
    }
    handleSave() {
        this.props.setModalClose(this.props.modal.eventIndex)
    }
    footerRender() {
        return (
            null
            //<div className="modal-footer">
            //    <button type="button"
            //            className="btn btn-secondary"
            //            data-dismiss="modal"
            //            onClick={() => this.handleClose()}
            //    >
            //        Close
            //    </button>
            //    <button type="button"
            //            className="btn btn-primary"
            //            onClick={() => this.handleSave()}
            //    >
            //        Save
            //    </button>
            //</div>
        )
    }

    render () {
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let { modal: { eventIndex}, events } = this.props
        let event = events[eventIndex]
        return (
            <Transition
                component="false"
                appear={{
                                opacity: 0,
                                translateY: this.props.modal.mousePosY-viewHeight/2
                             }}
                enter={{
                                opacity: 1,
                                translateY: 0
                              }}
                leave={{
                                opacity: 0,
                                translateY: this.props.modal.mousePosY-viewHeight/2
                             }}
            >
            <div
                className="modal-backdrop"
                style={modalWrapper}
                key={eventIndex}
            >
            <div className="modal"
                 style={modalStyle}
                >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => this.handleClose()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>

                            <div className="container-fluid">
                                <div className="row" style={TagsCol}>
                                    <div className="col-xs-6">
                                        <span style={TagsColSpace}> empty space </span>
                                        <AnimatedTags eventIndex={eventIndex}/>
                                    </div>
                                    <div className="col-xs-6">
                                        <AnimatedConfirmedTags eventIndex={eventIndex}/>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="modal-body">
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
                            <span style={eventCardHeaderSpan}>From: </span>
                            <b style={eventCardHeaderTitle}>{event.actor}</b>
                            <div>
                                <a href={`event?id=${event.id}`} style={eventCardHeaderUrl}>
                                    {`${moment(event.timeCreated).format('MMMM Do YYYY, HH:mm:ss.SSS')}`}
                                </a>

                            {this.footerRender()}  </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </Transition>
        )
    }
}

function mapStateToProps(state) {
    return {
        events: state.events,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { setModalClose })(EventModal)