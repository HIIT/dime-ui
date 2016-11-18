/*
 *
 * ProfilesPage
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfiles } from './selectors';
import {
 loadProfiles,
 createProfile,
 editProfile,
 cancelEditProfile,
 saveProfile,
 deleteProfile,
 clickOnProfileTag,
 clickOnEntityTag,
 clickOnEntityDelete,
 clickOnEntity,
} from './actions';
import requiresAuth from 'containers/RequiresAuth';
import ProfilesTab from 'components/ProfilesTab';

export class ProfilesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profiles: React.PropTypes.array,
    loadProfiles: React.PropTypes.func,
    createProfile: React.PropTypes.func,
    editProfile: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    saveProfile: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    clickOnProfileTag: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntity: React.PropTypes.func,
  }
  render() {
    return (
      <ProfilesTab
        profiles={this.props.profiles}
        initProfilesList={this.props.loadProfiles}
        createProfile={this.props.createProfile}
        editProfile={this.props.editProfile}
        cancelEditProfile={this.props.cancelEditProfile}
        saveProfile={this.props.saveProfile}
        deleteProfile={this.props.deleteProfile}
        clickOnProfileTag={this.props.clickOnProfileTag}
        clickOnEntityTag={this.props.clickOnEntityTag}
        clickOnEntityDelete={this.props.clickOnEntityDelete}
        clickOnEntity={this.props.clickOnEntity}
      />
   );
  }
}

const mapStateToProps = createStructuredSelector({
  profiles: selectProfiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadProfiles: bindActionCreators(loadProfiles, dispatch),
    createProfile: bindActionCreators(createProfile, dispatch),
    editProfile: bindActionCreators(editProfile, dispatch),
    cancelEditProfile: bindActionCreators(cancelEditProfile, dispatch),
    saveProfile: bindActionCreators(saveProfile, dispatch),
    deleteProfile: bindActionCreators(deleteProfile, dispatch),
    clickOnProfileTag: bindActionCreators(clickOnProfileTag, dispatch),
    clickOnEntityTag: bindActionCreators(clickOnEntityTag, dispatch),
    clickOnEntityDelete: bindActionCreators(clickOnEntityDelete, dispatch),
    clickOnEntity: bindActionCreators(clickOnEntity, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(ProfilesPage));
