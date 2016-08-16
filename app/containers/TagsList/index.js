/*
 *
 * TagsList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTagsList from './selectors';

export class TagsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entityID: React.PropTypes.number,
    tags: React.PropTypes.array,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    clickOnTag: React.PropTypes.func,
  }
  handleTagClick(tag, entityID, mouseEvent) {
    mouseEvent.preventDefault();
    this.props.clickOnTag(tag, entityID);
  }
  render() {
    const { tags, entityID } = this.props;
    const tagNodes = tags.map(function tagNodeRender(tag) {
      return (
        <span
          key={tag.id}
          className={`${this.props.className}`}
          style={this.props.style}
          onClick={(mouseEvent) => this.handleTagClick(tag, entityID, mouseEvent)}
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

const mapStateToProps = selectTagsList();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);
