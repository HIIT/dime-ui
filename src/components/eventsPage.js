import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { push } from 'react-router-redux'

import SearchBar from '../containers/searchBar'
import EventsList from '../containers/eventsList'
import EventModal from '../containers/eventModal'

const eventPageStyle = {
    marginTop: '60px',
}

class eventsPage extends Component {
    componentWillMount(){
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')
        if (username === null || password === null) {
            this.props.push('/login')
        }
    }
    render() {
        return (
            <div style={eventPageStyle}>
                <EventsList />
                <SearchBar />
                {this.props.modal.isOpen ? <EventModal />: null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { modal: state.modal }
}

export default connect(mapStateToProps, {push})(eventsPage)