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
    listTitle: React.PropTypes.string,
    editing: React.PropTypes.bool,
    clickOnEntitiyTag: React.PropTypes.func,
  }
  render() {
    const { entities, listTitle, editing, clickOnEntitiyTag } = this.props;
    return (
      <div>
        <h4>{listTitle}</h4>
        <ul className={styles.validatedentitiesUL}>
        {entities.map((entity) =>
          <ProfileEntityCard key={entity.id} entity={entity} editing={editing} clickOnEntitiyTag={clickOnEntitiyTag} />
        )}
        </ul>
      </div>
    );
  }
}

export default ProfileEntitiesList;
