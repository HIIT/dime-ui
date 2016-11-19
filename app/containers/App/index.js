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
  selectDocumentsPageError,
  selectEventsPageError,
  selectProfilesPageError,
  selectTimelinePageError,
  selectSignInPageError,
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
    documentsPageError: React.PropTypes.object,
    eventsPageError: React.PropTypes.object,
    profilesPageError: React.PropTypes.object,
    timelinePageError: React.PropTypes.object,
    signInPageError: React.PropTypes.object,
    clearCredentials: React.PropTypes.func,
  }
  clickOnAccountIcon = () => {
    this.props.clearCredentials();
    this.props.changeRoute('/signin');
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
    const { documentsPageError, eventsPageError, profilesPageError, timelinePageError, signInPageError } = this.props;
    const error = Object.assign({}, documentsPageError, eventsPageError, profilesPageError, timelinePageError, signInPageError);
    const hasError = !(Object.keys(error).length === 0 && error.constructor === Object);
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
          {error.response ?
            <Snackbar
              style={{ left: '57%' }}
              bodyStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              open={hasError}
              message={`HTTP Status Code ${get(error, ['response', 'status']) ? error.response.status : null}, ${get(error, ['response', 'statusText']) ? error.response.statusText : null}`}
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
  documentsPageError: selectDocumentsPageError(),
  eventsPageError: selectEventsPageError(),
  profilesPageError: selectProfilesPageError(),
  timelinePageError: selectTimelinePageError(),
  signInPageError: selectSignInPageError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
