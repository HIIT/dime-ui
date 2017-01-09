/**
*
* VersionNumber
*
*/

import React from 'react';

import styles from './styles.css';

class VersionNumber extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    value: React.PropTypes.string,
  };
  render() {
    return (
      <div className={styles.versionNumber}>
        <span>{this.props.value}</span>
      </div>
    );
  }
}

export default VersionNumber;
