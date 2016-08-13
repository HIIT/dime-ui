import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchBar from '../containers/searchBar'
import DocumentsList from '../containers/documentsList'
import DocumentsModal from '../containers/documentsModal'

class documentsPage extends Component {
    render() {
        return (
                <div>
                    <DocumentsList />
                    <SearchBar />
                    {this.props.modal.isOpen ? <DocumentsModal />: null}
                </div>
        )
    }
}

function mapStateToProps(state) {
    return { modal: state.modal }
}

export default connect(mapStateToProps, null)(documentsPage)