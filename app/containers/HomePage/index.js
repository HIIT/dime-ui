/*
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: React.PropTypes.func,
  };
  componentWillMount() {
    this.props.changeRoute('/events');
  }
  render() {
    return (
      <div></div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(HomePage);
