import { connect } from 'react-redux'

import ClusteredTags from '../components/clusteredTags'
import { tagConfirm, tagConfirmCancel } from '../actions/index'

export default connect(null, { tagConfirm, tagConfirmCancel })(ClusteredTags)