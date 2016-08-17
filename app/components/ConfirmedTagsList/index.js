/**
*
* ConfirmedTagsList
*
*/

import React from 'react';
import ListedTags from 'containers/TagsList';

import styles from './styles.css';

function ConfirmedTagsList() {
  const stylingClass = `label label-pill label-success pull-xs-right ${styles.confirmedTagsList}`;
  return (
    <ListedTags
      className={stylingClass}
      entityID={this.props.entityID}
      tags={this.props.tags}
    />
  );
}

export default ConfirmedTagsList;
