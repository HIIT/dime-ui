import React from 'react';
import { Component } from 'react'
import SearchBar from '../containers/searchBar'
import EventsList from '../containers/eventsList'

export default class documentsPage extends Component {
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