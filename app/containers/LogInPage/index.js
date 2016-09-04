/*
 *
 * LogInPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLogInPage from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class LogInPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectLogInPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
