import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { push } from 'react-router-redux'

import SearchBar from '../containers/searchBar'
import DocumentsList from '../containers/documentsList'
import DocumentsModal from '../containers/documentsModal'

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
                <div>
                    <DocumentsList />
                    <SearchBar />
                    {this.props.modal.isOpen ? <DocumentsModal />: null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { modal: state.modal }
}

export default connect(mapStateToProps, {push})(documentsPage)