/**
*
* AttributesListItem
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

class AttributesListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profileID: React.PropTypes.number,
    attributeKey: React.PropTypes.string,
    attributeValue: React.PropTypes.string,
    editAttributeFromProfile: React.PropTypes.func,
    deleteAttributeFromProfile: React.PropTypes.func,
    className: React.PropTypes.string,
    editing: React.PropTypes.bool,
  }

  deleteClicked = () => {
    this.props.deleteAttributeFromProfile(this.props.attributeKey, this.props.profileID);
  }

  handleAttributeValueChange = (e) => {
    this.props.editAttributeFromProfile(this.props.attributeKey, e.currentTarget.value, this.props.profileID);
  }

  handleBlur = () => { // event
  }

  handleKeyDown = () => { // event
    // if (event.keyCode === '13') {
    // }
  }

  handleSubmit = () => { // event
  }

  render() {
    const { className, attributeKey, editing } = this.props;

    return (
      <div
        className={`${styles.attributesListItem} ${styles.attribute} ${className}`}
      >

        <TextField
          defaultValue={attributeKey}
          hintText="Name"
          disabled
          style={{ width: '180px' }}
        />&nbsp;

        {editing ?
          <span>
            <TextField
              defaultValue={this.props.attributeValue}
              hintText="Value"
              disabled={!editing}
              style={{ width: '180px' }}
              onChange={(event) => this.handleAttributeValueChange(event)}
            />
            <span>&nbsp;<a className={`${styles.attributedelete}`} onClick={this.deleteClicked}>x</a></span>
          </span>
        : <TextField
          defaultValue={this.props.attributeValue}
          hintText="Value"
          disabled
          style={{ width: '180px' }}
        />
        }
      </div>
    );
  }
}

export default AttributesListItem;
