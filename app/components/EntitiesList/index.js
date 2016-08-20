/**
*
* EntitiesList
*
*/

import React from 'react';
import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
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
      <Row
        key={entity.id}
      >
        <Col xsOffset={1} xs={1} smOffset={1} sm={2} >
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
        </Col>
        <Col xs={8} sm={6} >
          <EntityCard
            entity={entity}
            clickOnEntityCard={this.props.clickOnEntityCard}
            clickOnEntityDelete={this.props.clickOnEntityDelete}
          />
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <Grid>
        <ReactList
          itemRenderer={this.renderEntity}
          length={this.props.entities.length}
          pageSize={6}
          threshold={400}
          useTranslate3d // TODO:check browsers support for Translate3d
        />
      </Grid>
    );
  }
}

export default EntitiesList;
