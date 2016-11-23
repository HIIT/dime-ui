/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import styles from './styles.css';
import NavBar from 'components/NavBar';
import { push } from 'react-router-redux';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import {
  selectAuthDomain,
  selectAPI,
  selectDocumentsPageLoading,
  selectEventsPageLoading,
  selectProfilesPageLoading,
  selectTimelinePageLoading,
  selectSignInPageLoading,
  selectAppError,
} from './selectors';
import { clearCredentials } from './actions';
import { createStructuredSelector } from 'reselect';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    auth: React.PropTypes.object,
    API: React.PropTypes.string,
    changeRoute: React.PropTypes.func,
    location: React.PropTypes.object,
    documentsPageLoading: React.PropTypes.bool,
    eventsPageLoading: React.PropTypes.bool,
    profilesPageLoading: React.PropTypes.bool,
    timelinePageLoading: React.PropTypes.bool,
    signInPageLoading: React.PropTypes.bool,
    appError: React.PropTypes.object,
    clearCredentials: React.PropTypes.func,
  }
  clickOnAccountIcon = () => {
    this.props.clearCredentials();
  }
  clickOnSendToLeaderboard = () => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.props.auth.token}`,
      },
    };
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    fetch(`http://${this.props.API}/api/updateleaderboard`, options).then(checkStatus);
  }
  render() {
    const { documentsPageLoading, eventsPageLoading, profilesPageLoading, timelinePageLoading, signInPageLoading } = this.props;
    const { appError } = this.props;
    const hasError = !(Object.keys(appError).length === 0 && appError.constructor === Object);
    return (
      <MuiThemeProvider>
        <div className={styles.container}>
          <NavBar
            changeRoute={this.props.changeRoute}
            auth={this.props.auth}
            pathName={this.props.location.pathname}
            clickOnAccountIcon={this.clickOnAccountIcon}
            clickOnSendToLeaderboard={this.clickOnSendToLeaderboard}
          />
          <div style={{ opacity: 0.65 }}>
            <ProgressBar intervalTime={40} autoIncrement percent={(documentsPageLoading || eventsPageLoading || profilesPageLoading || timelinePageLoading || signInPageLoading) === true ? 30 : 100} />
          </div>
          {React.Children.toArray(this.props.children)}
          {appError.response ?
            <Snackbar
              style={{ left: '50%' }}
              bodyStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              open={hasError}
              message={`HTTP Status Code ${appError.status ? appError.status : get(appError, ['response', 'status'])}: ${appError.message ? appError.message : get(appError, ['response', 'statusText'])}`}
            />
          : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    clearCredentials: bindActionCreators(clearCredentials, dispatch),
  };
}
const mapStateToProps = createStructuredSelector({
  auth: selectAuthDomain(),
  API: selectAPI(),
  documentsPageLoading: selectDocumentsPageLoading(),
  eventsPageLoading: selectEventsPageLoading(),
  profilesPageLoading: selectProfilesPageLoading(),
  timelinePageLoading: selectTimelinePageLoading(),
  signInPageLoading: selectSignInPageLoading(),
  appError: selectAppError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
