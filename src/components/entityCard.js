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
    renderPlainTextContent(informationElement) {
        return (
            <p style={entityCardPlainText}>
                {purify(informationElement.plainTextContent).map((text, index) => {
                        return (
                            <span style={entityCardPlainTextSpan} key={index}>{text} </span>
                        )
                    }
                )}
            </p>
        )
    }
    entityCardRender(entity, index) {
        let informationElement = entity.targettedResource? entity.targettedResource: entity
        //console.log(entity)
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
                    {entity.actor?
                        <span className="pull-xs-left" style={entityCardHeaderSpan}>
                            From: <b style={entityCardHeaderTitle}>{entity.actor}</b>
                        </span>
                    : null}
                    <span className="pull-xs-right" style={entityCardHeaderUrl}>
                        {`${moment(entity.timeCreated).format('MMMM Do YYYY, HH:mm:ss')}`}
                    </span>
                </div>
                <div className="card-block clearfix">
                    <a className="" href={`${informationElement.uri}`} style={{color:'rgba(0,0,0,.9)'}}>
                        {informationElement.title}
                    </a>
                    <h5 className="pull-xs-right">
                        <a href={`${informationElement.type}`}>
                        <span className="label label-default"
                              style={{backgroundColor: 'rgba(0,0,0,0.2)',
                                      color:'rgba(255,255,255,1)',
                                      fontWeight: 200,
                                      }}>
                             {informationElement.type.substring(informationElement.type.indexOf('#')+1, informationElement.type.length)}
                        </span>
                        </a>
                    </h5>


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


