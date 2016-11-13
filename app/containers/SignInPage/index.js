/*
 *
 * SignInPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSignInPage from './selectors';

export class SignInPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = selectSignInPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
