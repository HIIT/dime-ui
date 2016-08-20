/*
 *
 * DocumentsPage
 *
 */

 import React from 'react';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import { selectDocuments } from './selectors';
 import { loadDocuments, clickOnDocumentCard, deleteDocument, clickOnDocumentTag } from './actions';
 import requiresAuth from 'containers/RequiresAuth';
 import EntitiesList from 'components/EntitiesList';

 export class DocumentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     documents: React.PropTypes.array,
     loadDocuments: React.PropTypes.func,
     clickOnDocumentCard: React.PropTypes.func,
     deleteDocument: React.PropTypes.func,
     clickOnDocumentTag: React.PropTypes.func,
   }
   render() {
     return (
       <EntitiesList
         entities={this.props.documents}
         initEntitiesList={this.props.loadDocuments}
         clickOnEntityCard={this.props.clickOnDocumentCard}
         clickOnEntityDelete={this.props.deleteDocument}
         clickOnEntityTag={this.props.clickOnDocumentTag}
       />
     );
   }
 }

 const mapStateToProps = createStructuredSelector({
   documents: selectDocuments(),
 });

 function mapDispatchToProps(dispatch) {
   return {
     loadDocuments: bindActionCreators(loadDocuments, dispatch),
     clickOnDocumentCard: bindActionCreators(clickOnDocumentCard, dispatch),
     deleteDocument: bindActionCreators(deleteDocument, dispatch),
     clickOnDocumentTag: bindActionCreators(clickOnDocumentTag, dispatch),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(DocumentsPage));
