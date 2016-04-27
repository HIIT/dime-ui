import React from 'react';
import { Component } from 'react'

import NavBar from '../containers/navBar'

var contentBodyStyle = {
    marginTop: '80px',
};

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container"
             style={contentBodyStyle}
        >
                {this.props.children}
        </div>
      </div>
    );
  }
}

export default App