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
    getVersionNumber: React.PropTypes.func,
  };
  componentWillMount() {
    this.props.getVersionNumber();
  }
  render() {
    return (
      <div className={styles.versionNumber}>
        <span>{this.props.value.substring(0, this.props.value.lastIndexOf('-'))}</span>
      </div>
    );
  }
}

export default VersionNumber;
