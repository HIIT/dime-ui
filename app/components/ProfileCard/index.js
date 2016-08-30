/**
*
* Profile
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class ProfileCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.profile}>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

export default ProfileCard;
