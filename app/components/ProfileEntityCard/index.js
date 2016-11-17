/**
*
* ProfileEntityCard
*
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import TagsList from 'components/TagsList';

import styles from './styles.css';

class ProfileEntityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entity: React.PropTypes.object,
    editing: React.PropTypes.bool,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntitiy: React.PropTypes.func,
  }
  renderEvent(entityID, event, editing) {
    return (
      <li
        className={styles.validatedEventsLI}
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
            tags={event.targettedResource.tags}
            clickOnTag={this.props.clickOnEntityTag}
            className={styles.entityTags}
          />
        : null}
      </li>
    );
  }
  renderDocument(entityID, informationElement, editing) {
    return (
      <li
        className={styles.validatedInformationElementsLI}
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
            tags={informationElement.tags}
            clickOnTag={this.props.clickOnEntityTag}
            className={styles.entityTags}
          />
        : null}
      </li>
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
    const { entity, editing } = this.props;
    return (
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
      </Paper>
    );
  }
}

export default ProfileEntityCard;
