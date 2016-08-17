/*
 *
 * TagsList
 *
 */

import React from 'react';

export class TagsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entityID: React.PropTypes.number,
    tags: React.PropTypes.array,
    className: React.PropTypes.string,
    clickOnTag: React.PropTypes.func,
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
          key={tag.id}
          onClick={(mouseEvent) => this.handleTagClick(tag, entityID, mouseEvent)}
          className={className}
        >
          {tag.text}
        </span>
      );
    });
    return (
      <div className="clearfix">
        {tagNodes}
      </div>
    );
  }
}

export default TagsList;
