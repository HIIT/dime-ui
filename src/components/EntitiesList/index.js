import { React, Component } from 'react'
import moment from 'moment'
import ReactList from 'react-list'
import styles from './styles.css';

import ListedUnconfirmedTags from '../containers/ListedUnconfirmedTags'
import ListedConfirmedTags from '../containers/ListedConfirmedTags'
import { setModalClose, fetchData } from './actions'
import EntityCard from '../containers/EntityCard'

const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
class EntitiesList extends Component {
    componentWillMount() {
    	this.props.fetchData(this.props.entitiesType)
    }
    handleModalBackgroundClick() {
        this.props.setModalClose(this.props.modal.entityIndex)
    }
    renderEntities(entityIndex, key) {
        let entity = this.props.entities[entityIndex]
        let informationElement = entity.targettedResource? entity.targettedResource: entity
        let manualTags = informationElement.tags.filter((tag)=> { return ((typeof tag.auto !== "undefined") && tag.auto === false)})
        let autoTags = informationElement.tags.filter((tag) =>  { return ((typeof tag.auto === "undefined") || tag.auto === true)})
        return (
            <div
                className="row"
                key={key}
            >
                <div className="col-xs-1 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                    <ListedUnconfirmedTags entity={entity} tags={autoTags}/>
                    <ListedConfirmedTags entity={entity} tags={manualTags}/>
                </div>
                <EntityCard className="col-xs-8 col-sm-6" entity={entity} entityIndex={entityIndex} />
            </div>
        )
    }
    render() {
        return (
            <div
                style={this.props.modal.isOpen ? blur : null}
                onClick={this.props.modal.isOpen ? this.handleModalBackgroundClick : null}
            >
                <div
                    style={{
                            maxHeight: viewHeight
                            }}
                    className="container"
                >
                    <ReactList
                        itemRenderer={this.renderEntities.bind(this)}
                        length={this.props.entities.length}
                        pageSize={6}
                        threshold={350}
                        useTranslate3d={true}
                    />
                </div>
            </div>
        )
    }
}

export default EntitiesList

