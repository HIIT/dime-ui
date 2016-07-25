import { GET_PRE_24_FREQUENT_TAGS } from "../actions/index"
import getFrequentTags from '../services/getFrequentTags'

export default function(state = [], action) {
    switch (action.type) {
        case GET_PRE_24_FREQUENT_TAGS:
            return getFrequentTags(action.payload.data)
        default:
            return state
    }
}

