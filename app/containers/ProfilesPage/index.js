/*
 *
 * ProfilesPage
 *
 */

 import React from 'react';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import { selectProfiles, selectLoading, selectError } from './selectors';
 import { loadProfiles, searchProfile, createProfile } from './actions';
 import requiresAuth from 'containers/RequiresAuth';
 import ProfilesList from 'components/ProfilesList';

 export class ProfilesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     profiles: React.PropTypes.array,
     loading: React.PropTypes.bool,
     error: React.PropTypes.object,
     loadProfiles: React.PropTypes.func,
     searchProfile: React.PropTypes.func,
     createProfile: React.PropTypes.func,
   }
   render() {
     return (
       <ProfilesList
         profiles={this.props.profiles}
         loading={this.props.loading}
         error={this.props.error}
         initProfilesList={this.props.loadProfiles}
         search={this.props.searchProfile}
         createProfile={this.props.createProfile}
       />
     );
   }
 }

 const mapStateToProps = createStructuredSelector({
   profiles: selectProfiles(),
   loading: selectLoading(),
   error: selectError(),
 });

 function mapDispatchToProps(dispatch) {
   return {
     loadProfiles: bindActionCreators(loadProfiles, dispatch),
     searchProfile: bindActionCreators(searchProfile, dispatch),
     createProfile: bindActionCreators(createProfile, dispatch),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(ProfilesPage));
