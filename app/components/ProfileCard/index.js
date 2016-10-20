/**
*
* ProfileCard
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { grey300, blue500, green300, green500, red400, orange500 } from 'material-ui/styles/colors';
import { WithContext as TagsInput } from 'react-tag-input';
import TagsList from 'components/TagsList';
import ProfileEntitiesList from 'components/ProfileEntitiesList';

import styles from './styles.css';

export class ProfileCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clickOnProfileCard: React.PropTypes.func,
    editProfile: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    profile: React.PropTypes.object,
    clickOnProfileTag: React.PropTypes.func,
    clickOnEntitiy: React.PropTypes.func,
  }
  handleClickOnDelete = (profile, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.deleteProfile(profile.id);
  }
  handleClickOnEdit = (profile, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.editProfile(profile.id);
  }
  handleClickOnCancelEdit = (profile, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.cancelEditProfile(profile.id);
  }
  handleTagAddition = (tag) => {
    this.props.profile.tags.push({ id: this.props.profile.tags.length + 1, text: tag });
  }
  handleTagDelete = (index) => {
    const tags = this.props.profile.tags;
    tags.splice(index, 1);
    this.props.profile.tags = tags;
  }
  renderProfileCardHeader = (profile) => {
    const title = profile.name;
    const { editing } = profile;
    return (
      <CardHeader
        title={title}
      >
        { editing ? null :
          <div
            className={styles.cardHeaderEditWrapper}
          >
            <ModeEdit
              color={grey300}
              hoverColor={blue500}
              onClick={(mouseEvent) => { this.handleClickOnEdit(profile, mouseEvent); }}
            />
          </div>
        }
        { editing ?
          <div
            className={styles.cardHeaderCancelWrapper}
          >
            <NavigationCancel
              color={grey300}
              hoverColor={orange500}
              onClick={(mouseEvent) => { this.handleClickOnCancelEdit(profile, mouseEvent); }}
            />
          </div>
        : null }
        { editing ?
          <div
            className={styles.cardHeaderSaveWrapper}
          >
            <ContentSave
              color={green300}
              hoverColor={green500}
              onClick={(mouseEvent) => { this.handleClickOnSave(profile, mouseEvent); }}
            />
          </div>
        : null }
        <div
          className={styles.cardHeaderDeleteWrapper}
        >
          <ActionDelete
            color={grey300}
            hoverColor={red400}
            onClick={(mouseEvent) => { this.handleClickOnDelete(profile, mouseEvent); }}
          />
        </div>
      </CardHeader>
    );
  }
  renderProfileCardBody = (profile) => {
    const { editing, tags } = profile;
    profile.tags.push({ id: 1, text: 'fakeTag2' }, { id: 2, text: 'fakg3' }, { id: 3, text: 'fakeTa' }, { id: 4, text: 'fa5' }, { id: 5, text: 'fakeTa2' }, { id: 6, text: 'keTag3' }, { id: 7, text: 'fakeTa' }, { id: 8, text: 'fakeTag5' }, { id: 9, text: 'fakefakeTag5' });
    return (
      <CardText>
        <Row>
          <Col
            xs={2}
          >
            <h4>Tags</h4>
            { editing ?
              <TagsInput
                tags={tags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
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
            <div className={styles.suggestedEntitiesWrapper}>
              { profile.suggestedInformationElements.length > 0 ?
                <ProfileEntitiesList
                  listTitle="Suggested Documents"
                  entities={profile.suggestedInformationElements}
                  editing={editing}
                  clickOnEntitiy={this.props.clickOnEntitiy}
                />
              : null}
              { profile.suggestedEvents.length > 0 ?
                <ProfileEntitiesList
                  listTitle="Suggested Events"
                  entities={profile.suggestedEvents}
                  editing={editing}
                  clickOnEntitiy={this.props.clickOnEntitiy}
                />
              : null}
            </div>
          </Col>
          <Col
            xs={4}
          >
            { profile.validatedInformationElements.length > 0 ?
              <ProfileEntitiesList
                listTitle="Validated Documents"
                entities={profile.validatedInformationElements}
                editing={editing}
              />
            : null}
            { profile.validatedEvents.length > 0 ?
              <ProfileEntitiesList
                listTitle="Validated Events"
                entities={profile.validatedEvents}
                editing={editing}
              />
            : null}
          </Col>
        </Row>
      </CardText>
    );
  }
  renderProfileCardActions = () =>
    <CardActions>
    </CardActions>
  render() {
    const { profile } = this.props;
    return (
      <div
        className={styles.cardWrapper}
      >
        <Card>
          {this.renderProfileCardHeader(profile)}
          {this.renderProfileCardBody(profile)}
          {this.renderProfileCardActions(profile)}
        </Card>
      </div>
    );
  }
}

export default ProfileCard;
