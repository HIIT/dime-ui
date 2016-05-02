import moment from 'moment'
import Lazy from 'lazy.js'

import { DOCUMENT_SEARCH, FETCH_DOCUMENTS} from "../actions/index"
import { TAG_CONFIRM, TAG_CONFIRM_CANCEL } from "../actions/index"
export default function(state = [], action) {
    switch (action.type) {
        case DOCUMENT_SEARCH:
            return [...action.payload.data.docs]
        case FETCH_DOCUMENTS:
            return Lazy(action.payload.data).reverse().toArray()
        case TAG_CONFIRM:
            let newStateWithConfirmTags = state
            newStateWithConfirmTags.map((informationElement)=> {
                if (informationElement.id === action.payload.data.id) {
                    let informationElementWithNewTags = informationElement
                    informationElementWithNewTags.tags = action.payload.data.tags
                    return informationElementWithNewTags
                } else return informationElement
            })
            return [...newStateWithConfirmTags]
        case TAG_CONFIRM_CANCEL:
            let newStateWithTagRemoved = state
            newStateWithTagRemoved.map((informationElement)=> {
                if (informationElement.id === action.payload.data.id) {
                    let informationElementWithNewTags = informationElement
                    informationElementWithNewTags.tags = action.payload.data.tags
                    return informationElementWithNewTags
                } else return informationElement
            })
            return [...newStateWithTagRemoved]
        default:
            return state
    }
}
