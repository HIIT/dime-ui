import { React, Component } from 'react'
import { connect } from 'react-redux';
import ReactList from 'react-list'

import styles from './styles.css';
import { initEntitiesList } from './actions'
import ListedUnconfirmedTags from '../containers/ListedUnconfirmedTags'
import ListedConfirmedTags from '../containers/ListedConfirmedTags'
import EntityCard from '../containers/EntityCard'

class EntitiesList extends Component {
    componentWillMount() {
    	this.props.initEntitiesList()
    }
    renderEntity(entityIndex) {
        const entity = this.props.entities[entityIndex] //TODO:react-list should pass entity itslef as arugment, check doc.
        const informationElement = entity.targettedResource? entity.targettedResource: entity
        const manualTags = informationElement.tags.filter((tag)=> { return ((typeof tag.auto !== "undefined") && tag.auto === false)})
        const autoTags = informationElement.tags.filter((tag) =>  { return ((typeof tag.auto === "undefined") || tag.auto === true)})
        return (
            <div
                className="row"
                key={entity.id}
            >
                <div className="col-xs-1 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                    <ListedUnconfirmedTags 
                    	entity={entity} 
                    	tags={autoTags}
                    />
                    <ListedConfirmedTags 
                    	entity={entity} 
                    	tags={manualTags}
                    />
                </div>
                <EntityCard 
                	className="col-xs-8 col-sm-6" 
                	entity={entity} 
                	entityIndex={entityIndex} 
                />
            </div>
        )
    }
    render() {
        return (
                <div
                    className="container"
                >
                    <ReactList
                        itemRenderer={this.renderEntity.bind(this)}
                        length={this.props.entities.length}
                        pageSize={6}
                        threshold={350}
                        useTranslate3d={true}
                    />
                </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    initEntitiesList: () => dispatch(initEntitiesList()),
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(EntitiesList)
