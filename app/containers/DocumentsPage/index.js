/*
 *
 * DocumentsPage
 *
 */

 import React from 'react';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import { selectDocuments, selectProfiles } from './selectors';
 import {
   loadDocuments, loadMoreDocuments, searchDocument, clickOnDocumentCard, deleteDocument, clickOnDocumentTag,
   loadProfiles, addDocumentToProfile, removeDocumentFromProfile,
 } from './actions';
 import requiresAuth from 'containers/RequiresAuth';
 import EntitiesList from 'components/EntitiesList';

 export class DocumentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     documents: React.PropTypes.array,
     loadDocuments: React.PropTypes.func,
     loadMoreDocuments: React.PropTypes.func,
     searchDocument: React.PropTypes.func,
     clickOnDocumentCard: React.PropTypes.func,
     deleteDocument: React.PropTypes.func,
     clickOnDocumentTag: React.PropTypes.func,
     profiles: React.PropTypes.array,
     loadProfiles: React.PropTypes.func,
     addToProfile: React.PropTypes.func,
     removeFromProfile: React.PropTypes.func,
   }
   render() {
     return (
       <EntitiesList
         entities={this.props.documents}
         initEntitiesList={this.props.loadDocuments}
         loadMoreEntities={this.props.loadMoreDocuments}
         search={this.props.searchDocument}
         clickOnEntityCard={this.props.clickOnDocumentCard}
         clickOnEntityDelete={this.props.deleteDocument}
         clickOnEntityTag={this.props.clickOnDocumentTag}
         profiles={this.props.profiles}
         loadProfiles={this.props.loadProfiles}
         addToProfile={this.props.addToProfile}
         removeFromProfile={this.props.removeFromProfile}
       />
     );
   }
 }

 const mapStateToProps = createStructuredSelector({
   documents: selectDocuments(),
   profiles: selectProfiles(),
 });

 function mapDispatchToProps(dispatch) {
   return {
     loadDocuments: bindActionCreators(loadDocuments, dispatch),
     loadMoreDocuments: bindActionCreators(loadMoreDocuments, dispatch),
     searchDocument: bindActionCreators(searchDocument, dispatch),
     clickOnDocumentCard: bindActionCreators(clickOnDocumentCard, dispatch),
     deleteDocument: bindActionCreators(deleteDocument, dispatch),
     clickOnDocumentTag: bindActionCreators(clickOnDocumentTag, dispatch),
     loadProfiles: bindActionCreators(loadProfiles, dispatch),
     addToProfile: bindActionCreators(addDocumentToProfile, dispatch),
     removeFromProfile: bindActionCreators(removeDocumentFromProfile, dispatch),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(DocumentsPage));
