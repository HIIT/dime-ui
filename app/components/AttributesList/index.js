/**
*
* AttributesList
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import AttributesListItem from 'components/AttributesListItem';

import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles.css';

const listOfAttributeKeys = [
  'Name',
  'Personal phone',
  'WorkPhone',
  'E-mail',
  'Employer',
  'Current Position',
  'Education',
  'Industry',
];

class AttributesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profileID: React.PropTypes.number,
    attributes: React.PropTypes.object,
    // clickOnAttribute: React.PropTypes.func,
    addAttributeToProfile: React.PropTypes.func,
    editAttributeFromProfile: React.PropTypes.func,
    deleteAttributeFromProfile: React.PropTypes.func,
    editing: React.PropTypes.bool,
  }

  constructor() {
    super();

    this.state = {
      attributeKey: '',
      attributeValue: '',
    };
  }

  handleChangeNewAttributeKeyUpdateInput = (newValue) => {
    this.setState({
      attributeKey: newValue,
    });
  }

  handleChangeNewAttributeKeyNewRequest = () => {
  }

  handleNewAttributeKeyKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAdd();
    }
  }

  handleChangeNewAttributeValue = (event) => {
    this.setState({
      attributeValue: event.target.value,
    });
  }

  handleNewAttributeValueKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAdd();
    }
  }

  handleAdd = () => {
    if ((this.state.attributeKey.length === 0 || !this.state.attributeKey.trim()) === false) { // isEmpty()
      this.props.addAttributeToProfile(this.state.attributeKey, this.state.attributeValue, this.props.profileID);
    }
    this.setState({
      attributeKey: '',
      attributeValue: '',
    });
  }

  render() {
    const { attributes, profileID, editing, editAttributeFromProfile, deleteAttributeFromProfile } = this.props;

    const attributeNodes = Object.keys(attributes).map((attributeKey) => (
      <AttributesListItem
        key={attributeKey}
        attributeKey={attributeKey}
        attributeValue={attributes[attributeKey]}
        editing={editing}
        editAttributeFromProfile={editAttributeFromProfile}
        deleteAttributeFromProfile={deleteAttributeFromProfile}
        profileID={profileID}
      />
      ));

    return (
      <div
        className={`${styles.attributesList}`}
      >
        {attributeNodes}
        {editing ?
          <div
            className={`${styles.newAttributeContainer}`}
          >
            <AutoComplete
              id="new-attribute-key-controlled"
              floatingLabelFixed
              floatingLabelText="Add an attribute"
              hintText="Key"
              filter={AutoComplete.fuzzyFilter}
              dataSource={listOfAttributeKeys}
              maxSearchResults={5}
              openOnFocus
              searchText={this.state.attributeKey}
              onUpdateInput={this.handleChangeNewAttributeKeyUpdateInput}
              onNewRequest={this.handleChangeNewAttributeKeyNewRequest}
              textFieldStyle={{ width: '180px' }}
              onKeyPress={this.handleNewAttributeKeyKeyPress}
            />

            <TextField
              id="new-attribute-value-controlled"
              hintText="Value"
              onChange={this.handleChangeNewAttributeValue}
              onKeyPress={(event) => this.handleNewAttributeValueKeyPress(event)}
              style={{ width: '180px' }}
              value={this.state.attributeValue}
            />
          </div>
        :
          ''
        }
      </div>
    );
  }
}

export default AttributesList;
