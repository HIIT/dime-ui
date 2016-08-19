/*
 *
 * EntityCard
 *
 */

import React from 'react';
import moment from 'moment'; // TODO: es6 import moment?
import styles from './styles.css';

export class EntityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clickOnEntity: React.PropTypes.func,
    deleteEntity: React.PropTypes.func,
    entity: React.PropTypes.object,
  }
  handleClickOnEntity = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.clickOnEntity(entity);
  }
  handleClickOnDelete = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.deleteEntity(entity);
  }
  renderEntityCardHeader = (entity) => {
    const cardHeaderStyle = `card-header clearfix ${styles.entityCardHeader}`;
    const deletEntityStyle = `pull-xs-right ${styles.entityCardDelete}`;
    return (
      <div className={cardHeaderStyle}>
        {entity.actor ?
            this.renderEntityActor(entity.actor)
        : null}
        <span
          className={deletEntityStyle}
          onClick={(mouseEvent) => this.handleClickOnDelete(entity, mouseEvent)}
        >
          x
        </span>
        {entity.timeCreated ?
            this.renderEntityTimeCreated(entity.timeCreated)
        : null}
      </div>
    );
  }
  renderEntityCardBody = (entity) => {
    const informationElement = entity.targettedResource ? entity.targettedResource : entity;
    const cardBodyStyle = `card-block clearfix ${styles.entityCardBody}`;
    return (
      <div
        className={cardBodyStyle}
        onClick={(mouseEvent) => this.handleClickOnEntity(entity, mouseEvent)}
      >
        {informationElement.title ?
            this.renderInfoEleTitle(informationElement.title, informationElement.uri)
        : null}
        {informationElement.plainTextContent ?
            this.renderInfoElePlainTextContent(informationElement.plainTextContent)
        : null}
        {informationElement.type ?
            this.renderInfoEleTitle(informationElement.type)
        : null}
      </div>
    );
  }
  renderInfoEleTitle(title, uri) {
    return (
      <a
        className={styles.infoEleTitle}
        href={`${uri}`}
      >
        {title}
      </a>
    );
  }
  renderInfoEleType(type) {
    const labelStyle = `label label-default ${styles.infoEleLabel}`;
    return (
      <h5 className="pull-xs-right">
        <a href={`${type}`}>
          <span className={labelStyle}>
            {type.substring(type.indexOf('#') + 1, type.length)}
          </span>
        </a>
      </h5>
    );
  }
  renderEntityActor(actor) {
    const actorStyle = `ull-xs-left ${styles.entityCardHeaderSpan}`;
    return (
      <span className={actorStyle}>
        <span>From: </span>
        <b className={styles.entityCardHeaderTitle}>
          {actor}
        </b>
      </span>
    );
  }
  renderEntityTimeCreated(timeCreated) {
    const timeStampStyle = `pull-xs-right ${styles.entityCardHeaderUrl}`;
    return (
      <span className={timeStampStyle}>
        {`${moment(timeCreated).format('MMMM Do YYYY, HH:mm:ss')}`}
      </span>
    );
  }
  renderInfoElePlainTextContent(plainTextContent) {
    return (
      <p className={styles.entityCardPlainText} >
          {plainTextContent}
      </p>
    );
  }
  render() {
    const { entity } = this.props;
    const cardStyle = `card ${styles.entityCard}`;
    return (
      <div className={cardStyle} >
        {this.renderEntityCardHeader(entity)}
        {this.renderEntityCardBody(entity)}
      </div>
    );
  }
}

export default EntityCard;
