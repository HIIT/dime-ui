import { connect } from 'react-redux'

import EntitiesList from '../components/entitiesList'
import { fetchDocuments } from '../actions/index'
import { setModalClose } from '../actions/index'

let EventsList = EntitiesList

function mapStateToProps(state) {
    return {
        entities: state.documents,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { fetchDocuments, setModalClose })(EventsList)

