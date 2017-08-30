/*
 *
 * LinkContractsPage
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLinkContractRequests, selectLinkContracts, selectProfiles } from './selectors';
import {
  loadLinkContractRequests, sendLinkContractRequest, acceptLinkContractRequest, declineLinkContractRequest,
  loadLinkContracts, searchLinkContracts, deleteLinkContract, loadProfiles,
} from './actions';
import requiresAuth from 'containers/RequiresAuth';
import LinkContractRequestsList from 'components/LinkContractRequestsList';
import LinkContractsList from 'components/LinkContractsList';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

export class LinkContractsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    linkContractRequests: React.PropTypes.array,
    loadLinkContractRequests: React.PropTypes.func,
    sendLinkContractRequest: React.PropTypes.func,
    acceptLinkContractRequest: React.PropTypes.func,
    declineLinkContractRequest: React.PropTypes.func,

    linkContracts: React.PropTypes.array,
    loadLinkContracts: React.PropTypes.func,
    searchLinkContracts: React.PropTypes.func,
    deleteLinkContract: React.PropTypes.func,

    // profiles: React.PropTypes.array,
    // loadProfiles: React.PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      searchBoxValue: '',
      linkContractRequestValue: '',
    };
  }

  handleSearchBoxChange = (event) => {
    this.setState({
      searchBoxValue: event.target.value,
    });
  };

  handleSearchBoxKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.searchLinkContracts(this.state.searchBoxValue);
      this.setState({
        searchBoxValue: '',
      });
    }
  }

  handleSendLinkContractRequestChange = (event) => {
    this.setState({
      linkContractRequestValue: event.target.value,
    });
  };

  handleSendLinkContractRequestKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendLinkContractRequest(this.state.linkContractRequestValue);
      this.setState({
        linkContractRequestValue: '',
      });
    }
  }

  renderSearchBox = () => {
    const hint = 'Enter Keywords';
    const floatedHint = 'Search';
    return (
      <Row>
        <Col xsOffset={2} xs={8} smOffset={4} sm={6} >
          <TextField
            hintText={hint}
            floatingLabelText={floatedHint}
            onKeyDown={this.handleSearchBoxKeyDown}
            onChange={this.handleSearchBoxChange}
            fullWidth
            value={this.state.searchBoxValue}
          />
        </Col>
      </Row>
    );
  }

  renderSendLinkContractRequest = () => {
    const hint = 'did';
    const floatedHint = 'Send link contract request';
    return (
      <Row>
        <Col xsOffset={2} xs={10} smOffset={4} sm={8} >
          <TextField
            hintText={hint}
            floatingLabelText={floatedHint}
            onKeyDown={this.handleSendLinkContractRequestKeyDown}
            onChange={this.handleSendLinkContractRequestChange}
            fullWidth
            value={this.state.linkContractRequestValue}
          />
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className={`${styles.linkContractsPage}`}>
        <Grid>
          {this.renderSendLinkContractRequest()}
          <Row>
            <Col xsOffset={2} xs={10} smOffset={4} sm={8} >
              <h2>Requests</h2>
              <LinkContractRequestsList
                initEntitiesList={this.props.loadLinkContractRequests}
                linkContractRequests={this.props.linkContractRequests}
                search={this.foo}
                acceptLinkContractRequest={this.props.acceptLinkContractRequest}
                declineLinkContractRequest={this.props.declineLinkContractRequest}
              />

              <h2>Link Contracts</h2>
              <LinkContractsList
                initEntitiesList={this.props.loadLinkContracts}
                linkContracts={this.props.linkContracts}
                search={this.foo}
                deleteLinkContract={this.props.deleteLinkContract}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  linkContractRequests: selectLinkContractRequests(),
  linkContracts: selectLinkContracts(),
  profiles: selectProfiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadLinkContractRequests: bindActionCreators(loadLinkContractRequests, dispatch),
    sendLinkContractRequest: bindActionCreators(sendLinkContractRequest, dispatch),
    acceptLinkContractRequest: bindActionCreators(acceptLinkContractRequest, dispatch),
    declineLinkContractRequest: bindActionCreators(declineLinkContractRequest, dispatch),
    loadLinkContracts: bindActionCreators(loadLinkContracts, dispatch),
    searchLinkContracts: bindActionCreators(searchLinkContracts, dispatch),
    deleteLinkContract: bindActionCreators(deleteLinkContract, dispatch),
    loadProfiles: bindActionCreators(loadProfiles, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(LinkContractsPage));
