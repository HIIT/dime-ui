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
 import { loadProfiles, searchProfile, createProfile, editProfile, cancelEditProfile, deleteProfile, clickOnEntityTag } from './actions';
 import requiresAuth from 'containers/RequiresAuth';
 import ProfilesList from 'components/ProfilesList';

 export class ProfilesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     profiles: React.PropTypes.array,
     loadProfiles: React.PropTypes.func,
     searchProfile: React.PropTypes.func,
     createProfile: React.PropTypes.func,
     editProfile: React.PropTypes.func,
     cancelEditProfile: React.PropTypes.func,
     deleteProfile: React.PropTypes.func,
     clickOnEntityTag: React.PropTypes.func,
   }
   render() {
     return (
       <ProfilesList
         profiles={this.props.profiles}
         initProfilesList={this.props.loadProfiles}
         search={this.props.searchProfile}
         createProfile={this.props.createProfile}
         editProfile={this.props.editProfile}
         cancelEditProfile={this.props.cancelEditProfile}
         deleteProfile={this.props.deleteProfile}
         clickOnEntityTag={this.props.clickOnEntityTag}
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
     searchProfile: bindActionCreators(searchProfile, dispatch),
     createProfile: bindActionCreators(createProfile, dispatch),
     editProfile: bindActionCreators(editProfile, dispatch),
     cancelEditProfile: bindActionCreators(cancelEditProfile, dispatch),
     deleteProfile: bindActionCreators(deleteProfile, dispatch),
     clickOnEntityTag: bindActionCreators(clickOnEntityTag, dispatch),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(ProfilesPage));
