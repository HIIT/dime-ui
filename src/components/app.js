import React from 'react';
import { Component } from 'react'

import SearchBar from '../containers/searchBar'
import EventsList from '../containers/EventsList'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <hr />
        <EventsList />
      </div>
    );
  }
}
