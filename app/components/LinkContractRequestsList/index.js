/**
*
* LinkContractRequestsList
*
*/

import React from 'react';
import LinkContractRequestsListItem from 'components/LinkContractRequestsListItem';

import styles from './styles.css';

class LinkContractRequestsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    linkContractRequests: React.PropTypes.array,
    acceptLinkContractRequest: React.PropTypes.func,
    declineLinkContractRequest: React.PropTypes.func,
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
    const { linkContractRequests, acceptLinkContractRequest, declineLinkContractRequest } = this.props;

    const linkContractRequestNodes = Object.keys(linkContractRequests).map((key) => (
      <LinkContractRequestsListItem
        key={key}
        id={linkContractRequests[key].id}
        from={linkContractRequests[key].from}
        direction={linkContractRequests[key].direction}
        tags={linkContractRequests[key].tags}
        data={linkContractRequests[key].data}
        acceptLinkContractRequest={acceptLinkContractRequest}
        declineLinkContractRequest={declineLinkContractRequest}
      />
      ));

    return (
      <div
        className={`${styles.linkContractRequestsList}`}
      >
        {linkContractRequestNodes}
      </div>
    );
  }
}

export default LinkContractRequestsList;
