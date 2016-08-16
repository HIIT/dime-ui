/*
 *
 * RequiresAuth
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import selectRequiresAuth from './selectors';

// Learn from http://engineering.blogfoster.com/higher-order-components-theory-and-practice/
export default function requiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: PropTypes.object,
    };
    componentDidMount() {
      this.checkAndRedirect().bind(this);
    }
    componentDidUpdate() {
      this.checkAndRedirect().bind(this);
    }
    checkAndRedirect() {
      if (this.checkAuth(this.props.auth)) {
        browserHistory.push('/login');
      }
    }
    checkAuth(auth) {
      if (typeof auth.username !== 'undefined' && typeof auth.password !== 'undefined') {
        return false;
      }
      return true;
    }
    render() {
      return (
        <div className="authenticated">
          { this.checkAuth(this.props.auth) ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }
  const mapStateToProps = selectRequiresAuth();
  return connect(mapStateToProps)(AuthenticatedComponent);
}
