import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import Transition from 'react-motion-ui-pack'
import moment from 'moment'

import { entityCardHeaderSpan, entityCardHeaderTitle, entityCardHeaderUrl, entityCardPlainText, entityCardPlainTextSpan} from '../components/entityCard'
import { purify } from '../services/purifyText'
import ClusteredTags from '../containers/clusteredTags'

const modalStyle = {
    top: '8vh',
    display: 'block'
}

const modalWrapper = {
    background: 'transparent',
    zIndex: 1040,
};

class EntityModal extends Component {
    handleClose(mouseEvent) {
        this.props.setModalClose(this.props.modal.entityIndex)
    }
    render () {
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let { modal: { entityIndex }, entities } = this.props
        let entity = entities[entityIndex]
        let informationElement = entity.targettedResource? entity.targettedResource: entity
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
                    key={entityIndex}
                    onClick={(mouseEvent) => this.handleClose(mouseEvent)}
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
                                            onClick={(mouseEvent) => this.handleClose(mouseEvent)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>

                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <ClusteredTags entity={entity} tags={informationElement.tags} maxHeight='250'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <b>
                                        {informationElement.type.substring(informationElement.type.indexOf('#')+1, informationElement.type.length)}
                                    </b>
                                    <span> </span>
                                    <a className="" href={`${informationElement.uri}`}>
                                        {informationElement.title}
                                    </a>
                                    <p style={entityCardPlainText}>
                                        {purify(informationElement.plainTextContent).map((text, index) => {
                                                return (
                                                    <span style={entityCardPlainTextSpan} key={index}>{text} </span>
                                                )
                                            }
                                        )}
                                    </p>
                                    <span style={entityCardHeaderSpan}>From: </span>
                                    <b style={entityCardHeaderTitle}>{entity.actor}</b>
                                    <div>
                                        <a href={`entity?id=${entity.id}`} style={entityCardHeaderUrl}>
                                            {`${moment(entity.timeCreated).format('MMMM Do YYYY, HH:mm:ss.SSS')}`}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        )
    }
}

export default EntityModal
