import React from 'react';
import { Component } from 'react'
import NavBar from '../components/navBar'

var contentBodyStyle = {
    marginTop: '100px'
};

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container" style={contentBodyStyle}>
            {this.props.children}
        </div>
      </div>
    );
  }
}
