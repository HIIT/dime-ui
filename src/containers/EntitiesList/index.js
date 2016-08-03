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
    renderEntities(entityIndex) {
        let entity = this.props.entities[entityIndex]
        let informationElement = entity.targettedResource? entity.targettedResource: entity
        let manualTags = informationElement.tags.filter((tag)=> { return ((typeof tag.auto !== "undefined") && tag.auto === false)})
        let autoTags = informationElement.tags.filter((tag) =>  { return ((typeof tag.auto === "undefined") || tag.auto === true)})
        return (
            <div
                className="row"
                key={}
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
