import React from 'react';
import { Component } from 'react'

import SearchBar from '../containers/searchBar'
import EventsList from '../containers/eventsList'
import NavBar from '../components/navBar'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <NavBar />
        <SearchBar />
        <hr />
        <EventsList />
      </div>
    );
  }
}
