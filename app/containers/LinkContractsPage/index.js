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
      value: '',
    };
  }

  foo = () => {

  }

  makeDummy = (entryType) => {
    const obj = {
      type: entryType,
      fromDid: '=!:did:sov:V1e68J8fmvdsjPvSdRSqoC',
      fromName: 'Marcus',
      toDid: '=!:did:sov:NVJWBwL3ft3Sk7GKiNTcje',
      toName: 'Max',
      data: {
        '#dime#work[<#tag>]<@~1>': 'astrophysics',
        '#dime#work[<#tag>]<@~0>': 'astronomy',
        '#dime<#email>': 'bob@dime.com',
        '#dime<#role>': 'USER',
        '#dime#work<#did>': '=!:did:sov:XQRLb4UUokjjGf7HGG9BC4',
        '#dime<#username>': 'dimebob',
      },
    };
    return obj;
  }

  handleSearchBoxChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSearchBoxKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.searchLinkContracts(this.state.value);
    }
  }

  handleSendLinkContractRequestChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSendLinkContractRequestKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendLinkContractRequest(this.state.value);
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
          />
        </Col>
      </Row>
    );
  }

  render() {
    /* const requests = [];
    for (let i = 0; i < 3; i += 1) {
      requests.push(this.makeDummy('request'));
    }

    const contracts = [];
    for (let i = 0; i < 3; i += 1) {
      contracts.push(this.makeDummy('contract'));
    } */

    return (
      <div className={styles.linkContractsPage}>
        <Grid>
          {this.renderSearchBox()}
          {this.renderSendLinkContractRequest()}
          <Row>
            <Col xsOffset={2} xs={10} smOffset={4} sm={8} >
              <h2>Requests</h2>
              <LinkContractsList
                type="request"
                initEntitiesList={this.props.loadLinkContractRequests}
                linkContracts={this.props.linkContractRequests}
                search={this.foo}
                acceptLinkRequest={this.props.acceptLinkContractRequest}
                declineLinkContract={this.props.declineLinkContractRequest}
              />

              <h2>Link Contracts</h2>
              <LinkContractsList
                type="contract"
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
