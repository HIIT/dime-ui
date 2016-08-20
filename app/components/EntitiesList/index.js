/**
*
* EntitiesList
*
*/

import React from 'react';
import ReactList from 'react-list';
import TagsList from 'components/TagsList';
import EntityCard from 'components/EntityCard';
import styles from './styles.css';

export class EntitiesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    entities: React.PropTypes.array,
    clickOnEntityCard: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.initEntitiesList();
  }
  renderEntity = (entityIndex) => {
    const entity = this.props.entities[entityIndex]; // TODO:react-list should pass entity itslef as arugment, check doc.
    const notAutoTags = entity.tags.filter((tag) => !tag.auto);
    const autoTags = entity.tags.filter((tag) => tag.auto);
    return (
      <div
        className="row"
        key={entity.id}
      >
        <div className="col-xs-1 col-xs-offset-1 col-sm-2 col-sm-offset-1">
          <TagsList
            entityID={entity.id}
            tags={autoTags}
            clickOnTag={this.props.clickOnEntityTag}
            className={`label-default ${styles.autoTag}`}
          />
          <TagsList
            entityID={entity.id}
            tags={notAutoTags}
            clickOnTag={this.props.clickOnEntityTag}
            className={`label-sucess ${styles.notAutoTag}`}
          />
        </div>
        <EntityCard
          className="col-xs-8 col-sm-6"
          entity={entity}
          clickOnEntityCard={this.props.clickOnEntityCard}
          clickOnEntityDelete={this.props.clickOnEntityDelete}
        />
      </div>
    );
  }
  render() {
    return (
      <div
        className="container"
      >
        <ReactList
          itemRenderer={this.renderEntity}
          length={this.props.entities.length}
          pageSize={6}
          threshold={350}
          useTranslate3d // TODO:check browsers support for Translate3d
        />
      </div>
    );
  }
}

export default EntitiesList;
