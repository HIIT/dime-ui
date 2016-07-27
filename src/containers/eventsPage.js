import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import SearchBar from '../containers/searchBar'
import EventsList from '../containers/eventsList'
import EventsModal from '../containers/eventsModal'

class eventsPage extends Component {
    componentWillMount(){
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')
    }
    render() {
        return (
            <div>
                <EventsList />
                <SearchBar />
                {this.props.modal.isOpen ? <EventsModal />: null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { modal: state.modal }
}

export default connect(mapStateToProps, null)(eventsPage)