/**
*
* ProfileCard
*
*/

import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import { WithContext as TagsInput } from 'react-tag-input';
import TagsList from 'components/TagsList';
import ProfileEntitiesList from 'components/ProfileEntitiesList';

import styles from './styles.css';

export class ProfileCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    editProfile: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    saveProfileName: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    profile: React.PropTypes.object,
    clickOnProfileTag: React.PropTypes.func,
    addTagToProfile: React.PropTypes.func,
    deleteTagFromProfile: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntity: React.PropTypes.func,
  }
  handleClickOnEdit = (profile) => {
    this.props.editProfile(profile.id);
  }
  handleClickOnCancelEdit = (profile) => {
    this.props.cancelEditProfile(profile.id);
  }
  handleClickOnDelete = (profile) => {
    this.props.deleteProfile(profile.id);
  }
  handleTagAddition = (text, profileID) => {
    this.props.addTagToProfile({ '@type': 'Tag', text }, profileID);
  }
  handleTagDelete = (tagIndex, profileID) => {
    const tag = this.props.profile.tags[tagIndex];
    this.props.deleteTagFromProfile(tag, profileID);
  }
  handleProfileNameChange = (event, profileID) => {
    const profileName = event.target.value;
    this.props.saveProfileName(profileName, profileID);
  }
  handleProfileNameTextFieldKeyPress = (event, profileID) => {
    if (event.key === 'Enter') {
      const profileName = event.target.value;
      this.props.saveProfileName(profileName, profileID);
    }
  }
  renderProfileCardHeader = (profile) => {
    const { editing, name } = profile;
    return (
      <div className={styles.cardHeader}>
        <div
          className={styles.cardHeaderTitleWrapper}
        >
          <TextField
            defaultValue={name}
            floatingLabelText="Profile Name"
            disabled={!editing}
            style={{ width: '140px' }}
            onChange={(event) => this.handleProfileNameChange(event, profile.id)}
            onKeyPress={(event) => this.handleProfileNameTextFieldKeyPress(event, profile.id)}
          />
        </div>
        <div
          className={styles.cardHeaderDeleteWrapper}
        >
          <RaisedButton
            label="DELETE"
            secondary
            icon={<ActionDelete />}
            onClick={(mouseEvent) => { this.handleClickOnDelete(profile, mouseEvent); }}
          />
        </div>
        { editing ? null :
          <div
            className={styles.cardHeaderEditWrapper}
          >
            <RaisedButton
              label="EDIT"
              primary
              icon={<ModeEdit />}
              onClick={(mouseEvent) => { this.handleClickOnEdit(profile, mouseEvent); }}
            />
          </div>
        }
        { editing ?
          <div
            className={styles.cardHeaderCancelWrapper}
          >
            <RaisedButton
              label="EXIT"
              icon={<ActionExitToApp />}
              onClick={(mouseEvent) => { this.handleClickOnCancelEdit(profile, mouseEvent); }}
            />
          </div>
        : null }
      </div>
    );
  }
  renderValidatedEntitiesList = (profile, editing) =>
    <div className={styles.validatedEntitiesWrapper}>
      { profile.validatedInformationElements.length > 0 ?
        <ProfileEntitiesList
          listTitle="Validated Documents"
          entities={profile.validatedInformationElements}
          entityType="validatedInformationElements"
          editing={editing}
          profileID={profile.id}
          clickOnEntityTag={this.props.clickOnEntityTag}
          clickOnEntityDelete={this.props.clickOnEntityDelete}
          clickOnEntity={this.props.clickOnEntity}
        />
      : null}
      { profile.validatedEvents.length > 0 ?
        <ProfileEntitiesList
          listTitle="Validated Events"
          entities={profile.validatedEvents}
          entityType="validatedEvents"
          editing={editing}
          profileID={profile.id}
          clickOnEntityTag={this.props.clickOnEntityTag}
          clickOnEntityDelete={this.props.clickOnEntityDelete}
          clickOnEntity={this.props.clickOnEntity}
        />
      : null}
    </div>
  renderSuggestedEntitiesList = (profile, editing) =>
    <div className={styles.suggestedEntitiesWrapper}>
      { profile.suggestedInformationElements.length > 0 ?
        <ProfileEntitiesList
          listTitle="Suggested Documents"
          entities={profile.suggestedInformationElements}
          entityType="suggestedInformationElements"
          editing={editing}
          profileID={profile.id}
          clickOnEntityTag={this.props.clickOnEntityTag}
          clickOnEntityDelete={this.props.clickOnEntityDelete}
          clickOnEntity={this.props.clickOnEntity}
        />
      : null}
      { profile.suggestedEvents.length > 0 ?
        <ProfileEntitiesList
          listTitle="Suggested Events"
          entities={profile.suggestedEvents}
          entityType="suggestedEvents"
          editing={editing}
          profileID={profile.id}
          clickOnEntityTag={this.props.clickOnEntityTag}
          clickOnEntityDelete={this.props.clickOnEntityDelete}
          clickOnEntity={this.props.clickOnEntity}
        />
      : null}
    </div>
  renderProfileCardBody = (profile) => {
    const { editing, tags } = profile;
    return (
      <div className={styles.profileCardBodyWrapper}>
        <CardText>
          <Row>
            <Col
              xs={2}
            >
              <h4>Tags</h4>
              { editing ?
                <TagsInput
                  tags={tags}
                  handleDelete={(tagIndex) => this.handleTagDelete(tagIndex, profile.id)}
                  handleAddition={(text) => this.handleTagAddition(text, profile.id)}
                  classNames={{
                    tagInput: `${styles.profileTagsInput}`,
                    selected: `${styles.profileTagsSelected}`,
                    tag: `${styles.profileTagsEditing}`,
                    remove: `${styles.profileTagsRemove}`,
                    suggestions: `${styles.profileTagSuggestion}`,
                  }}
                />
              :
                <TagsList
                  entityID={profile.id}
                  tags={profile.tags}
                  clickOnTag={this.props.clickOnProfileTag}
                  className={styles.profileTags}
                />
              }
            </Col>
            <Col
              xs={2}
            >
              {this.renderSuggestedEntitiesList(profile, editing)}
            </Col>
            <Col
              xs={4}
            >
              {this.renderValidatedEntitiesList(profile, editing)}
            </Col>
          </Row>
        </CardText>
      </div>
    );
  }
  render() {
    const { profile } = this.props;
    return (
      <Card>
        {this.renderProfileCardHeader(profile)}
        {this.renderProfileCardBody(profile)}
      </Card>
    );
  }
}

export default ProfileCard;
