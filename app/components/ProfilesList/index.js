/**
*
* ProfilesList
*
*/

import React from 'react';
import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddBox from 'material-ui/svg-icons/content/add-box';
import CircularProgress from 'material-ui/CircularProgress';
import ProfileCard from 'components/ProfileCard';
import styles from './styles.css';

export class ProfilesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initProfilesList: React.PropTypes.func,
    createProfile: React.PropTypes.func,
    search: React.PropTypes.func,
    profiles: React.PropTypes.array,
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
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
  handeClickProfileCreate = () => {
    this.props.createProfile(this.state.profileName);
  }
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.search(this.state.value);
    }
  }
  rednerLoadingIndicator = () => (this.props.loading ? <CircularProgress size={0.5} /> : null)
  renderProfile = (profile) => {
    const { id } = profile;
    return (
      <Row
        key={id}
        className={styles.profileWrapper}
      >
        <Col xsOffset={0} xs={1} smOffset={2} sm={2} >
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
          <ProfileCard
            profile={profile}
          />
        </Col>
        <Col xs={1} >
        </Col>
      </Row>
    );
  }
  renderSearchBox = () => {
    const hint = 'Search';
    const floatedHint = 'Keyword';
    return (
      <Row>
        <Col
          smOffset={3}
          xs={1}
          sm={1}
        >
          <div className={styles.loadingIndicatorWrapper}>
            {this.rednerLoadingIndicator()}
          </div>
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
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
      <Grid
        className={styles.profilesListWrapper}
      >
        {this.renderSearchBox()}
        <Row>
          <Col
            xsOffset={2}
            xs={1}
          >
            <div className={styles.createButtonWrapper}>
              <TextField
                hintText="Name"
                floatingLabelText="New Profile"
                style={{ width: '120px' }}
                onChange={this.handleProfileNameChange}
              />
              <RaisedButton
                label="CREATE"
                labelPosition="after"
                primary
                icon={<AddBox />}
                style={{ width: '120px' }}
                disabled={this.state.profileName.length < 1}
                onClick={this.handeClickProfileCreate}
              />
            </div>
          </Col>
        </Row>
        <ReactList
          itemRenderer={(index) => this.renderProfile(this.props.profiles[index])}
          length={this.props.profiles.length}
          pageSize={12}
          threshold={450}
          useTranslate3d // TODO:check browsers support for Translate3d
        />
      </Grid>
    );
  }
}

export default ProfilesList;
