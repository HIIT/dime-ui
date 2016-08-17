/*
 *
 * EntitiesList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import { initEntitiesList } from './actions';
import UnconfirmedTagsList from 'components/UnconfirmedTagsList';
import ConfirmedTagsList from 'components/ConfirmedTagsList';
import EntityCard from 'containers/EntityCard';

export class EntitiesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    entities: React.PropTypes.array,
  }
  componentWillMount() {
    this.props.initEntitiesList();
  }
  renderEntity = (entityIndex) => {
    const entity = this.props.entities[entityIndex]; // TODO:react-list should pass entity itslef as arugment, check doc.
    const informationElement = entity.targettedResource ? entity.targettedResource : entity;
    const manualTags = informationElement.tags.filter((tag) => {
      const IsManual = ((typeof tag.auto !== 'undefined') && tag.auto === false);
      return IsManual;
    });
    const autoTags = informationElement.tags.filter((tag) => {
      const IsAuto = ((typeof tag.auto === 'undefined') || tag.auto === true);
      return IsAuto;
    });
    return (
      <div
        className="row"
        key={entity.id}
      >
        <div className="col-xs-1 col-xs-offset-1 col-sm-2 col-sm-offset-1">
          <UnconfirmedTagsList
            entityID={entity.id}
            tags={autoTags}
          />
          <ConfirmedTagsList
            entityID={entity.id}
            tags={manualTags}
          />
        </div>
        <EntityCard
          className="col-xs-8 col-sm-6"
          entity={entity}
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

function mapDispatchToProps(dispatch) {
  return {
    initEntitiesList: () => dispatch(initEntitiesList()),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(EntitiesList);
