import React from 'react';
import ReactDOM from 'react-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Transition from 'react-motion-ui-pack'
import Lazy from  'lazy.js'
import ReactList from 'react-list'

import ListedUnconfirmedTags from '../containers/listedUnconfirmedTags'
import ListedConfirmedTags from '../containers/listedConfirmedTags'
import { fetchEvents } from '../actions/index'
import { setModalClose } from '../actions/index'
import EntityCard from '../containers/entityCard'

export const blur = {
    WebkitFilter: 'blur(2px)',
    MozFilter: 'blur(2px)',
    OFilter: 'blur(2px)',
    MsFilter: 'blur(2px)',
    filter: 'blur(2px)',
    opacity: 0.6,
}

class EntitiesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entitiesListContainerWidth: 0
        };
    }
    componentWillMount() {
        if (this.props.fetchEvents) { this.props.fetchEvents() }
        if (this.props.fetchDocuments) { this.props.fetchDocuments() }
    }
    handleClick() {
        this.props.setModalClose(this.props.modal.entityIndex)
    }
    renderEntities(entityIndex, key) {
        let entity = this.props.entities[entityIndex]
        let informationElement = entity.targettedResource? entity.targettedResource: entity
        let manualTags = Lazy(informationElement.tags).filter((tag)=> { return ((typeof tag.auto != "undefined") && tag.auto === false)}).toArray()
        //let autoTags = Lazy(informationElement.tags).filter((tag) => {return tag.auto}).toArray()
        let autoTags = Lazy(informationElement.tags).filter((tag) =>  { return ((typeof tag.auto === "undefined") || tag.auto === true)}).toArray()
        return (
            <div
                className="row"
                key={key}
            >
                <div className="col-xs-2 col-xs-offset-1">
                    <ListedUnconfirmedTags entity={entity} tags={autoTags}/>
                    <ListedConfirmedTags entity={entity} tags={manualTags}/>
                </div>
                <EntityCard className="col-xs-6" entity={entity} entityIndex={entityIndex} />
            </div>
        )
    }
    render() {
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        return (
            <div
                style={this.props.modal.isOpen ? blur : null}
                onClick={this.props.modal.isOpen ? this.handleClick : null}
            >
                <div
                    style={{
                            paddingTop: '5px',
                            maxHeight: viewHeight
                            }}

                >
                    <ReactList
                        itemRenderer={this.renderEntities.bind(this)}
                        length={this.props.entities.length}
                        type='variable'
                    />
                </div>
            </div>
        )
    }
}

export default EntitiesList

