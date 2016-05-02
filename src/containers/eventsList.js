import { connect } from 'react-redux'

import EntitiesList from '../components/entitiesList'
import { fetchEvents } from '../actions/index'
import { setModalClose } from '../actions/index'

let EventsList = EntitiesList

function mapStateToProps(state) {
    return {
        entities: state.events,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { fetchEvents, setModalClose })(EventsList)
