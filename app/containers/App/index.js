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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import styles from './styles.css';
import NavBar from 'components/NavBar';
import { push } from 'react-router-redux';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import {
  selectAuthDomain,
  selectDocumentsPageLoading,
  selectEventsPageLoading,
  selectProfilesPageLoading,
  selectTimelinePageLoading,
  selectDocumentsPageError,
  selectEventsPageError,
  selectProfilesPageError,
  selectTimelinePageError,
} from './selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    auth: React.PropTypes.object,
    changeRoute: React.PropTypes.func,
    location: React.PropTypes.object,
    documentsPageLoading: React.PropTypes.bool,
    eventsPageLoading: React.PropTypes.bool,
    profilesPageLoading: React.PropTypes.bool,
    timelinePageLoading: React.PropTypes.bool,
    documentsPageError: React.PropTypes.object,
    eventsPageError: React.PropTypes.object,
    profilesPageError: React.PropTypes.object,
    timelinePageError: React.PropTypes.object,
  }
  render() {
    const { documentsPageLoading, eventsPageLoading, profilesPageLoading, timelinePageLoading } = this.props;
    const { documentsPageError, eventsPageError, profilesPageError, timelinePageError } = this.props;
    const error = Object.assign({}, documentsPageError, eventsPageError, profilesPageError, timelinePageError);
    return (
      <MuiThemeProvider>
        <div className={styles.container}>
          <NavBar
            changeRoute={this.props.changeRoute}
            auth={this.props.auth}
            pathName={this.props.location.pathname}
          />
          <div style={{ opacity: 0.65 }}>
            <ProgressBar intervalTime={40} autoIncrement percent={(documentsPageLoading || eventsPageLoading || profilesPageLoading || timelinePageLoading) ? 7 : 100} />
          </div>
          {React.Children.toArray(this.props.children)}
          <Snackbar
            style={{ left: '57%' }}
            bodyStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            open={(typeof error.err !== 'undefined')}
            message={error.err ? `HTTP Status Codes ${get(error, ['err', 'response', 'status']) ? error.err.response.status : null}; Message: ${get(error, ['err', 'message']) ? error.err.message : null}` : ''}
          />
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
  documentsPageLoading: selectDocumentsPageLoading(),
  eventsPageLoading: selectEventsPageLoading(),
  profilesPageLoading: selectProfilesPageLoading(),
  timelinePageLoading: selectTimelinePageLoading(),
  documentsPageError: selectDocumentsPageError(),
  eventsPageError: selectEventsPageError(),
  profilesPageError: selectProfilesPageError(),
  timelinePageError: selectTimelinePageError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
