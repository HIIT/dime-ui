/*
 *
 * RequiresAuth
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import selectAuthDomain from './selectors';
import { createStructuredSelector } from 'reselect';

// Learn from http://engineering.blogfoster.com/higher-order-components-theory-and-practice/
export default function requiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object,
      changeRoute: React.PropTypes.func,
    };
    componentDidMount() {
      this.checkAndRedirect();
    }
    componentDidUpdate() {
      this.checkAndRedirect();
    }
    openRoute = (route) => {
      this.props.changeRoute(route);
    }
    openSignInPage = () => {
      this.openRoute('/signin');
    }
    checkAndRedirect = () => {
      if (!this.hasAuthToken(this.props.auth.toJS())) {
        this.openSignInPage();
      }
    }
    hasAuthToken = (auth) => {
      if (typeof auth.token !== 'undefined') {
        return true;
      }
      return false;
    }
    render() {
      return (
        <div className="authenticated">
          { this.hasAuthToken(this.props.auth.toJS()) ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeRoute: (url) => dispatch(push(url)),
      dispatch,
    };
  }
  const mapStateToProps = createStructuredSelector({
    auth: selectAuthDomain(),
  });
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
