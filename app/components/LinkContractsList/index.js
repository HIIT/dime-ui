/**
*
* LinkContractsList
*
*/

import React from 'react';
import LinkContractsListItem from 'components/LinkContractsListItem';

import styles from './styles.css';

class LinkContractsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    linkContracts: React.PropTypes.array,
    acceptLinkRequest: React.PropTypes.func,
    declineLinkContract: React.PropTypes.func,
    deleteLinkContract: React.PropTypes.func,
    type: React.PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  componentWillMount() {
    this.props.initEntitiesList();
  }

  render() {
    const { linkContracts, acceptLinkRequest, declineLinkContract, deleteLinkContract } = this.props;

    const linkContractNodes = Object.keys(linkContracts).map((key) => (
      <LinkContractsListItem
        key={key}
        id={linkContracts[key].id}
        type={this.props.type}
        fromDid={linkContracts[key].fromDid}
        fromName={linkContracts[key].fromName}
        fromAddress={linkContracts[key].fromAddress}
        toDid={linkContracts[key].toDid}
        toName={linkContracts[key].toName}
        toAddress={linkContracts[key].toAddress}
        direction={linkContracts[key].direction}
        tags={linkContracts[key].tags}
        data={linkContracts[key].data}
        acceptLinkRequest={acceptLinkRequest}
        declineLinkContract={declineLinkContract}
        deleteLinkContract={deleteLinkContract}
      />
      ));

    return (
      <div
        className={`${styles.linkContractsList}`}
      >
        {linkContractNodes}
      </div>
    );
  }
}

export default LinkContractsList;
