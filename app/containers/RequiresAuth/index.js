/*
 *
 * RequiresAuth
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { selectAuthDomain, selectCurrentPathname } from './selectors';
import { saveLocationBeforeSignIn } from './actions';
import { createStructuredSelector } from 'reselect';

// Learn from http://engineering.blogfoster.com/higher-order-components-theory-and-practice/
export default function requiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object,
      currentPathname: React.PropTypes.string,
      changeRoute: React.PropTypes.func,
      saveLocationBeforeSignIn: React.PropTypes.func,
    };
    componentDidMount() {
      this.props.saveLocationBeforeSignIn(this.props.currentPathname);
      this.checkAndRedirect();
    }
    checkAndRedirect = () => {
      if (!this.props.auth.token) {
        this.props.changeRoute('/signin');
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
    currentPathname: selectCurrentPathname(),
  });
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
