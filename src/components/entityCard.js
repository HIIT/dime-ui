import React from 'react';
import { Component } from 'react'
import moment from 'moment'
import Transition from 'react-motion-ui-pack'

import { setModalOpen } from '../actions/index'
import { purify } from '../services/purifyText'

export const entityCard = {
    cursor: 'pointer',
    wordWrap: 'break-word',
}
export const entityCardPlainText = {
    fontSize: '9px',
    color: 'rgba(0,0,0,0.2)'
}
export const entityCardPlainTextSpan = {
}
export const entityCardHeader = {
    padding: '5px 10px 5px 10px'
}
export const entityCardHeaderTitle = {
    fontSize: '12px'
}
export const entityCardHeaderSpan = {
    fontSize: '9px'
}
export const entityCardHeaderUrl = {
    fontSize: '9px',
}

class EntityCard extends Component {
    entityCardRender(entity, index) {
        let informationElement = entity.targettedResource? entity.targettedResource: entity
        return (
            //<Transition
            //    component="false"
            //    appear={{
            //        height: 0,
            //        opacity: 0
            //     }}
            //    enter={{
            //        height: 'auto',
            //        opacity: 1,
            //      }}
            //    leave={{
            //        height: 0,
            //        opacity: 0
            //     }}
            //>
            <div className="card" style={entityCard} key={index}>
                <div className="card-header clearfix" style={entityCardHeader}>
                    <span style={entityCardHeaderSpan}>From: </span>
                    <b style={entityCardHeaderTitle}>{entity.actor}</b>
                    <a className="pull-xs-right" href={`entity?id=${entity.id}`} style={entityCardHeaderUrl}>
                        {`${moment(entity.timeCreated).format('MMMM Do YYYY, HH:mm:ss.SSS')}`}
                    </a>
                </div>
                <div className="card-block">
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
                </div>
            </div>
            //</Transition>
        )
    }
    handleClickOnEvent(entityIndex, mouseEvent) {
        if (this.props.setModalOpen) {
            let posY = mouseEvent.nativeEvent.screenY
            this.props.setModalOpen(entityIndex, posY)
        }
    }
    render() {
        let {entityIndex, entity} = this.props
        return (
            <div
                className={`${this.props.className}`}
                onClick={(mouseEvent) => this.handleClickOnEvent(entityIndex, mouseEvent)}
            >
                {this.entityCardRender(entity, entityIndex)}
            </div>
        )
    }
}

export default EntityCard


