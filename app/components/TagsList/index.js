/**
*
* TagsList
*
*/

import React from 'react';

import styles from './styles.css';

class TagsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entityID: React.PropTypes.number,
    profileID: React.PropTypes.number,
    tags: React.PropTypes.array,
    clickOnTag: React.PropTypes.func,
    className: React.PropTypes.string,
  }
  handleTagClick = (tag, entityID, profileID) => {
    this.props.clickOnTag(tag, entityID, profileID);
  }
  render() {
    const { tags, entityID, className, profileID } = this.props;
    const tagNodes = tags.map((tag, key) => {
      if (tag.text) {
        return (
          <span
            key={`tag ${key}`}
            onClick={(mouseEvent) => {
              mouseEvent.stopPropagation();
              this.handleTagClick(tag, entityID, profileID);
            }}
            className={`${styles.tag} ${className}`}
          >
            {tag.text}
          </span>
        );
      }
      return null;
    });
    return (
      <div className={styles.tagsList}>
        {tagNodes}
      </div>
    );
  }
}

export default TagsList;
