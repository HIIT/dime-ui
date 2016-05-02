import { connect } from 'react-redux'
import { setModalClose } from '../actions/index.js'

import EntityModal from '../components/entityModal'

let EventsModal = EntityModal

function mapStateToProps(state) {
    return {
        entities: state.events,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { setModalClose })(EventsModal)