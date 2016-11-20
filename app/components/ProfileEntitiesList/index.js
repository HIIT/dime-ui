/**
*
* ProfileEntitiesList
*
*/

import React from 'react';
import ProfileEntityCard from 'components/ProfileEntityCard';

import styles from './styles.css';

class ProfileEntitiesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entities: React.PropTypes.array,
    entityType: React.PropTypes.string,
    listTitle: React.PropTypes.string,
    editing: React.PropTypes.bool,
    profileID: React.PropTypes.number,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityStateToggle: React.PropTypes.func,
  }
  render() {
    const { entities, entityType, listTitle, editing, profileID, clickOnEntityTag, clickOnEntityDelete, clickOnEntityStateToggle } = this.props;
    return (
      <div>
        <h4>{listTitle}</h4>
        <ul className={styles.entitiesUL}>
          {entities.map((entity) =>
            <ProfileEntityCard
              key={entity.id}
              entity={entity}
              entityType={entityType}
              editing={editing}
              profileID={profileID}
              clickOnEntityTag={clickOnEntityTag}
              clickOnEntityDelete={clickOnEntityDelete}
              clickOnEntityStateToggle={clickOnEntityStateToggle}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default ProfileEntitiesList;
