/**
*
* ProfileEntityCard
*
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import TagsList from 'components/TagsList';
import Checkbox from 'material-ui/Checkbox';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { grey300, red400, yellow500 } from 'material-ui/styles/colors';
import styles from './styles.css';

class ProfileEntityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entity: React.PropTypes.object,
    entityType: React.PropTypes.string,
    editing: React.PropTypes.bool,
    profileID: React.PropTypes.number,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityStateToggle: React.PropTypes.func,
  }
  handleClickOnDelete = (entityID, entityType, mouseEvent) => {
    mouseEvent.stopPropagation();
    this.props.clickOnEntityDelete(entityID, entityType, this.props.profileID);
  }
  handleClickOnToogle = (mouseEvent, isInputChecked, entity, entityType, profileID) => {
    this.props.clickOnEntityStateToggle(entity, entityType, profileID);
  }
  renderEvent(entityID, event, editing) {
    return (
      <div
        className={styles.entityWrapper}
      >
        <div className={styles.profileNameWrapper}>
          {event.title || event.type.substring(event.type.indexOf('#') + 1, event.type.length || event['@type'])}
        </div>
        <div className={styles.cardHeaderInfoWrapper} >
          <span>
            {this.renderType(event.type)} {this.renderActor(event.actor)} <br />
            {this.renderTime(event.timeCreated)}
          </span>
        </div>
        { editing && event.targettedResource ?
          <TagsList
            entityID={entityID}
            profileID={this.props.profileID}
            tags={event.targettedResource.tags}
            clickOnTag={this.props.clickOnEntityTag}
            className={styles.entityTags}
          />
        : null}
      </div>
    );
  }
  renderDocument(entityID, informationElement, editing) {
    return (
      <div
        className={styles.entityWrapper}
      >
        <div className={styles.profileNameWrapper} >
          {informationElement.title || informationElement.type.substring(informationElement.type.indexOf('#') + 1, informationElement.type.length || informationElement['@type'])}
        </div>
        <div className={styles.cardHeaderInfoWrapper} >
          <span>
            {this.renderType(informationElement.type)} {this.renderActor(informationElement.actor)} <br />
            {this.renderTime(informationElement.timeCreated)}
          </span>
        </div>
        { editing ?
          <TagsList
            entityID={entityID}
            profileID={this.props.profileID}
            tags={informationElement.tags}
            clickOnTag={this.props.clickOnEntityTag}
            className={styles.entityTags}
          />
        : null}
      </div>
    );
  }
  renderType(type) {
    return (
      <span className={styles.entityTypeKey}>
        {type.substring(type.indexOf('#') + 1, type.length)}
      </span>
    );
  }
  renderActor(actor) {
    return (
      <span>
        { actor > 0 ?
          <span
            className={styles.entityActor}
          >
            Actor {actor}
          </span>
        : null }
      </span>
    );
  }
  renderTime(time) {
    const timeObject = new Date(time);
    return (
      <span
        className={styles.entityTime}
      >
        {timeObject.toUTCString()}
      </span>
    );
  }
  render() {
    const { entity, entityType, profileID, editing } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <Paper
          key={entity.id}
          rounded={false}
          className={styles.profileEntityCardWrapper}
        >
        {entity.informationElement ?
          this.renderDocument(entity.id, entity.informationElement, editing)
        : null}
        {entity.event ?
          this.renderEvent(entity.id, entity.event, editing)
        : null}
        { editing && entityType.indexOf('suggested') === -1 ?
          <div className={styles.deleteButtonWrapper}>
            <ActionDelete
              color={grey300}
              hoverColor={red400}
              style={{ width: '19px' }}
              onClick={(mouseEvent) => { this.handleClickOnDelete(entity.id, entityType, mouseEvent); }}
            />
          </div>
        : null }
        { editing ?
          <div
            className={entityType.indexOf('suggested') === -1 ? styles.devalidateButtonWrapper : styles.confirmSuggestedButtonWrapper}
          >
            <Checkbox
              checkedIcon={
                <Star
                  style={{ width: '19px', fill: `${yellow500}`, stroke: `${yellow500}` }}
                />
              }
              uncheckedIcon={
                <StarBorder
                  style={{ width: '22px', fill: `${yellow500}` }}
                />
              }
              defaultChecked={entityType.indexOf('suggested') === -1}
              onCheck={(event, isInputChecked) => this.handleClickOnToogle(event, isInputChecked, entity, entityType, profileID)}
            />
          </div>
        : null }
        </Paper>
      </div>
    );
  }
}

export default ProfileEntityCard;
