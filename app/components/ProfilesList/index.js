/**
*
* ProfilesList
*
*/

import React from 'react';
// import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import ProfileCard from 'components/ProfileCard';
import styles from './styles.css';

export class ProfilesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initProfilesList: React.PropTypes.func,
    createProfile: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    editProfile: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    search: React.PropTypes.func,
    profiles: React.PropTypes.array,
    clickOnEntitiy: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      profileName: '',
    };
  }
  componentWillMount() {
    this.props.initProfilesList();
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleProfileNameChange = (event) => {
    this.setState({
      profileName: event.target.value,
    });
  };
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.createProfile(event.target.value);
    }
  }
  handeClickProfileCreate = () => {
    this.props.createProfile(this.state.profileName);
  }
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.search(this.state.value);
    }
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
            profile={profile}
            editProfile={this.props.editProfile}
            cancelEditProfile={this.props.cancelEditProfile}
            deleteProfile={this.props.deleteProfile}
            clickOnEntityTag={this.props.clickOnEntityTag}
            clickOnEntitiy={this.props.clickOnEntitiy}
          />
        </Col>
      </Row>
    );
  }
  renderSearchBox = () => {
    const hint = 'Search';
    const floatedHint = 'Keyword';
    return (
      <Row>
        <Col xsOffset={1} xs={10} smOffset={4} sm={6} >
          <TextField
            hintText={hint}
            floatingLabelText={floatedHint}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            fullWidth
          />
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <Grid>
        {this.renderSearchBox()}
        <Row>
          <Col
            xsOffset={1}
            xs={1}
          >
            <div className={styles.createButtonWrapper}>
              <TextField
                hintText="Profile"
                floatingLabelText="New"
                style={{ width: '88px' }}
                onChange={this.handleProfileNameChange}
                onKeyPress={this.handleKeyPress}
              />
              <RaisedButton
                labelPosition="after"
                primary
                icon={<Add />}
                style={{ minWidth: '34px' }}
                disabled={this.state.profileName.length < 1}
                onClick={this.handeClickProfileCreate}
              />
            </div>
          </Col>
          <Col xs={10}>
            <Tabs
              tabItemContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.025)', marginTop: '10px' }}
              inkBarStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            >
              {
                this.props.profiles.map((profile) =>
                  <Tab
                    key={profile.id}
                    label={profile.name}
                    style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                  >
                    {this.renderProfile(profile)}
                  </Tab>
                )
              }
            </Tabs>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProfilesList;
