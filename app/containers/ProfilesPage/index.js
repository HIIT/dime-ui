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
 saveProfileName,
 deleteProfile,
 clickOnProfileTag,
 addTagToProfile,
 deleteTagFromProfile,
 clickOnEntityTag,
 clickOnEntityDelete,
 clickOnEntityStateToggle,
 clickOnSendToPeopleFinder,
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
    saveProfileName: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    clickOnProfileTag: React.PropTypes.func,
    addTagToProfile: React.PropTypes.func,
    deleteTagFromProfile: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityStateToggle: React.PropTypes.func,
    clickOnSendToPeopleFinder: React.PropTypes.func,
  }
  render() {
    return (
      <ProfilesTab
        profiles={this.props.profiles}
        initProfilesList={this.props.loadProfiles}
        createProfile={this.props.createProfile}
        editProfile={this.props.editProfile}
        cancelEditProfile={this.props.cancelEditProfile}
        saveProfileName={this.props.saveProfileName}
        deleteProfile={this.props.deleteProfile}
        clickOnProfileTag={this.props.clickOnProfileTag}
        addTagToProfile={this.props.addTagToProfile}
        deleteTagFromProfile={this.props.deleteTagFromProfile}
        clickOnEntityTag={this.props.clickOnEntityTag}
        clickOnEntityDelete={this.props.clickOnEntityDelete}
        clickOnEntityStateToggle={this.props.clickOnEntityStateToggle}
        clickOnSendToPeopleFinder={this.props.clickOnSendToPeopleFinder}
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
    saveProfileName: bindActionCreators(saveProfileName, dispatch),
    deleteProfile: bindActionCreators(deleteProfile, dispatch),
    clickOnProfileTag: bindActionCreators(clickOnProfileTag, dispatch),
    addTagToProfile: bindActionCreators(addTagToProfile, dispatch),
    deleteTagFromProfile: bindActionCreators(deleteTagFromProfile, dispatch),
    clickOnEntityTag: bindActionCreators(clickOnEntityTag, dispatch),
    clickOnEntityDelete: bindActionCreators(clickOnEntityDelete, dispatch),
    clickOnEntityStateToggle: bindActionCreators(clickOnEntityStateToggle, dispatch),
    clickOnSendToPeopleFinder: bindActionCreators(clickOnSendToPeopleFinder, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(ProfilesPage));
