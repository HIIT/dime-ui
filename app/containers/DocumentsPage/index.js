/*
 *
 * DocumentsPage
 *
 */

 import React from 'react';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import { selectDocuments, selectLoading, selectError } from './selectors';
 import { loadDocuments, searchDocument, clickOnDocumentCard, deleteDocument, clickOnDocumentTag } from './actions';
 import requiresAuth from 'containers/RequiresAuth';
 import EntitiesList from 'components/EntitiesList';

 export class DocumentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     documents: React.PropTypes.array,
     loading: React.PropTypes.bool,
     error: React.PropTypes.object,
     loadDocuments: React.PropTypes.func,
     searchDocument: React.PropTypes.func,
     clickOnDocumentCard: React.PropTypes.func,
     deleteDocument: React.PropTypes.func,
     clickOnDocumentTag: React.PropTypes.func,
   }
   render() {
     return (
       <EntitiesList
         entities={this.props.documents}
         loading={this.props.loading}
         error={this.props.error}
         initEntitiesList={this.props.loadDocuments}
         search={this.props.searchDocument}
         clickOnEntityCard={this.props.clickOnDocumentCard}
         clickOnEntityDelete={this.props.deleteDocument}
         clickOnEntityTag={this.props.clickOnDocumentTag}
       />
     );
   }
 }

 const mapStateToProps = createStructuredSelector({
   documents: selectDocuments(),
   loading: selectLoading(),
   error: selectError(),
 });

 function mapDispatchToProps(dispatch) {
   return {
     loadDocuments: bindActionCreators(loadDocuments, dispatch),
     searchDocument: bindActionCreators(searchDocument, dispatch),
     clickOnDocumentCard: bindActionCreators(clickOnDocumentCard, dispatch),
     deleteDocument: bindActionCreators(deleteDocument, dispatch),
     clickOnDocumentTag: bindActionCreators(clickOnDocumentTag, dispatch),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(DocumentsPage));
