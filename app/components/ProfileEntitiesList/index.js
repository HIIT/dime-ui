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
    clickOnEntitiy: React.PropTypes.func,
  }
  render() {
    const { entities, listTitle, editing, clickOnEntitiy } = this.props;
    return (
      <div>
        <h4>{listTitle}</h4>
        <ul className={styles.validatedentitiesUL}>
        {entities.map((entity) =>
          <ProfileEntityCard key={entity.id} entity={entity} editing={editing} clickOnEntitiy={clickOnEntitiy} />
        )}
        </ul>
      </div>
    );
  }
}

export default ProfileEntitiesList;
