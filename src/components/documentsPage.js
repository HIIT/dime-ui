import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { push } from 'react-router-redux'

import SearchBar from '../containers/searchBar'
import EventsList from '../containers/eventsList'

class documentsPage extends Component {
    componentWillMount(){
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')
        if (username === null || password === null) {
            this.props.push('/login')
        }
    }
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

export default connect(null, {push})(documentsPage)