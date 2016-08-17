/**
*
* UnconfirmedTagsList
*
*/

import React from 'react';
import ListedTags from 'containers/TagsList';

import styles from './styles.css';

function UnconfirmedTagsList() {
  const stylingClass = `label label-pill label-default pull-xs-right ${styles.unconfirmedTagsList}`;
  return (
    <ListedTags
      className={stylingClass}
      entityID={this.props.entityID}
      tags={this.props.tags}
    />
  );
}

export default UnconfirmedTagsList;
