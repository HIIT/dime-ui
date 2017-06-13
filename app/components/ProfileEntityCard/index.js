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
import get from 'lodash/get';
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
  handleClickOnToggle = (mouseEvent, isInputChecked, entity, entityType, profileID) => {
    this.props.clickOnEntityStateToggle(entity, entityType, profileID);
  }
  renderEvent(entityID, event, editing) {
    const type = get(event, 'type', '');
    return (
      <div
        className={styles.entityWrapper}
      >
        <div className={styles.profileNameWrapper}>
          {get(event, 'title') || type.substring(type.indexOf('#') + 1, type.length || event['@type'])}
        </div>
        <div className={styles.cardHeaderInfoWrapper} >
          <span>
            {this.renderType(type)} {this.renderActor(get(event, 'actor', ''))} <br />
            {this.renderTime(get(event, 'timeCreated', ''))}
          </span>
        </div>
        { editing && event.targettedResource ?
          <TagsList
            entityID={entityID}
            profileID={this.props.profileID}
            tags={get(event, 'targettedResource.tags')}
            clickOnTag={this.props.clickOnEntityTag}
            className={styles.entityTags}
          />
        : null}
      </div>
    );
  }
  renderDocument(entityID, informationElement, editing) {
    const type = get(informationElement, 'type', '');
    return (
      <div
        className={styles.entityWrapper}
      >
        <div className={styles.profileNameWrapper} >
          {get(informationElement, 'title') || type.substring(type.indexOf('#') + 1, type.length || informationElement['@type'])}
        </div>
        <div className={styles.cardHeaderInfoWrapper} >
          <span>
            {this.renderType(type)} {this.renderActor(get(informationElement, 'actor'))} <br />
            {this.renderTime(get(informationElement, 'timeCreated'))}
          </span>
        </div>
        { editing ?
          <TagsList
            entityID={entityID}
            profileID={this.props.profileID}
            tags={get(informationElement, 'tags')}
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
                onCheck={(event, isInputChecked) => this.handleClickOnToggle(event, isInputChecked, entity, entityType, profileID)}
              />
            </div>
          : null }
        </Paper>
      </div>
    );
  }
}

export default ProfileEntityCard;
