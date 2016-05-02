import { connect } from 'react-redux'
import { setModalClose } from '../actions/index.js'

import EntityModal from '../components/entityModal'

let DocumentsModal = EntityModal

function mapStateToProps(state) {
    return {
        entities: state.documents,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { setModalClose })(DocumentsModal)
