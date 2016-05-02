import { connect } from 'react-redux'

import EntityCard from '../components/entityCard'
import { setModalOpen } from '../actions/index'

export default connect(null, {setModalOpen})(EntityCard)

