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
    tags: React.PropTypes.array,
    clickOnTag: React.PropTypes.func,
    className: React.PropTypes.string,
  }
  handleTagClick(tag, entityID, mouseEvent) {
    mouseEvent.preventDefault();
    this.props.clickOnTag(tag, entityID);
  }
  render() {
    const { tags, entityID, className } = this.props;
    const tagNodes = tags.map(function tagNodeRender(tag) {
      return (
        <span
          key={tag.id} // TODO: in current dime API, tag does not have id, find alternative for keys
          onClick={(mouseEvent) => this.handleTagClick(tag, entityID, mouseEvent)}
          className={`label label-pill pull-xs-right ${className}`}
        >
          {tag.text}
        </span>
      );
    });
    return (
      <div className={styles.tagsList}>
        {tagNodes}
      </div>
    );
  }
}

export default TagsList;
