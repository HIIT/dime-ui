/*
 *
 * RequiresAuth
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import selectAuthDomain from './selectors';
import { saveLocationBeforeSignIn } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';

// Learn from http://engineering.blogfoster.com/higher-order-components-theory-and-practice/
export default function requiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object,
      changeRoute: React.PropTypes.func,
      location: React.PropTypes.object,
      saveLocationBeforeSignIn: React.PropTypes.func,
    };
    componentDidMount() {
      this.checkAndRedirect();
    }
    checkAndRedirect = () => {
      if (!this.props.auth.token || !this.props.auth.rememberMe) {
        this.props.changeRoute('/signin');
        this.props.saveLocationBeforeSignIn(this.props.location);
      }
    }
    render() {
      return (
        <div className={this.props.auth.token ? 'authenticated' : 'unauthenticated'}>
          { this.props.auth.token ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeRoute: (url) => dispatch(push(url)),
      saveLocationBeforeSignIn: bindActionCreators(saveLocationBeforeSignIn, dispatch),
    };
  }
  const mapStateToProps = createStructuredSelector({
    auth: selectAuthDomain(),
  });
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
