/**
*
* ProfilesList
*
*/

import React from 'react';
// import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import ProfileCard from 'components/ProfileCard';
import styles from './styles.css';

export class ProfilesTab extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initProfilesList: React.PropTypes.func,
    profiles: React.PropTypes.array,
    createProfile: React.PropTypes.func,
    editProfile: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    saveProfileName: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    clickOnProfileTag: React.PropTypes.func,
    addTagToProfile: React.PropTypes.func,
    deleteTagFromProfile: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntity: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.initProfilesList();
  }
  handeClickProfileCreate = () => {
    this.props.createProfile('untitled');
  }
  renderProfile = (profile) => {
    const { id } = profile;
    return (
      <Row
        key={id}
        className={styles.profileWrapper}
      >
        <Col xs={12}>
          <ProfileCard
            editProfile={this.props.editProfile}
            cancelEditProfile={this.props.cancelEditProfile}
            saveProfileName={this.props.saveProfileName}
            deleteProfile={this.props.deleteProfile}
            profile={profile}
            clickOnProfileTag={this.props.clickOnProfileTag}
            addTagToProfile={this.props.addTagToProfile}
            deleteTagFromProfile={this.props.deleteTagFromProfile}
            clickOnEntityTag={this.props.clickOnEntityTag}
            clickOnEntityDelete={this.props.clickOnEntityDelete}
            clickOnEntity={this.props.clickOnEntity}
          />
        </Col>
      </Row>
    );
  }
  renderCreateNewProfilePanel = () =>
    <div className={styles.createButtonWrapper}>
      <div style={{ position: 'relative', left: '60%' }} >
        <RaisedButton
          labelPosition="after"
          primary
          icon={<Add />}
          style={{ minWidth: '34px' }}
          onClick={this.handeClickProfileCreate}
        />
      </div>
    </div>
  render() {
    return (
      <div className={styles.profileEditorWrapper}>
        <Grid>
          <Row>
            <Col
              xsOffset={1}
              xs={1}
            >
              {this.renderCreateNewProfilePanel()}
            </Col>
            <Col xs={10}>
              <Tabs
                tabItemContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.035)' }}
                inkBarStyle={{ backgroundColor: 'rgba(0, 255, 180, 0.7)' }}
              >
                {
                  this.props.profiles.map((profile) =>
                    <Tab
                      key={profile.id}
                      label={profile.name}
                      style={{ color: 'rgba(0, 0, 0, 0.75)' }}
                    >
                      {this.renderProfile(profile)}
                    </Tab>
                  )
                }
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProfilesTab;
