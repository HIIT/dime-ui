/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.css';
import NavBar from 'components/NavBar';
import { push } from 'react-router-redux';
import { selectAuthDomain } from './selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    auth: React.PropTypes.object,
    changeRoute: React.PropTypes.func,
    location: React.PropTypes.object,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className={styles.container}>
          <NavBar
            changeRoute={this.props.changeRoute}
            auth={this.props.auth}
            pathName={this.props.location.pathname}
          />
          {React.Children.toArray(this.props.children)}
        </div>
      </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
