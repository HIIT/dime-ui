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
    deleteLinkContract: React.PropTypes.func,
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
    const { linkContracts, deleteLinkContract } = this.props;

    const linkContractNodes = (linkContracts !== undefined ? Object.keys(linkContracts).map((key) => (
      <LinkContractsListItem
        key={key}
        id={linkContracts[key].id}
        authorizingAuthority={linkContracts[key].authorizingAuthority}
        requestingAuthority={linkContracts[key].requestingAuthority}
        direction={linkContracts[key].direction}
        name={linkContracts[key].name}
        username={linkContracts[key].username}
        email={linkContracts[key].email}
        attributes={linkContracts[key].attributes}
        tags={linkContracts[key].tags}
        data={linkContracts[key].data}
        deleteLinkContract={deleteLinkContract}
      />
      )) : []);

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
