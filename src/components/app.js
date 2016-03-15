import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'

import NavBar from '../components/navBar'

var contentBodyStyle = {
};

export default class App extends Component {
  render() {
    const { dispatch, isAuthenticated } = this.props
    return (
      <div>
        <NavBar
            isAuthenticated={isAuthenticated}
            dispatch={dispatch}
        />
        <div className="container" style={contentBodyStyle}>
            {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated,
    }
}

export default connect(mapStateToProps)(App)