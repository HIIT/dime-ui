import { GET_ALL_TIME_FREQUENT_TAGS } from "../actions/index"
import getFrequentTags from '../services/getFrequentTags'

export default function(state = [], action) {
    switch (action.type) {
        case GET_ALL_TIME_FREQUENT_TAGS:
            return getFrequentTags(action.payload.data).slice(0,20)
        default:
            return state
    }
}

