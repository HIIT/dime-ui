import { GET_CLUSTER_LAYER_0, GET_CLUSTER_TAG_LAYER } from "../actions/index"
import getFrequentTags from '../services/getFrequentTags'
import getLevenClustersCoordinations  from '../services/getLevenClustersCoordinations'

export default function(state = {}, action) {
    switch (action.type) {
        case GET_CLUSTER_LAYER_0:
            return {
                tags: getFrequentTags(action.payload.data).slice(0,10),
                tagsCoordination: getLevenClustersCoordinations(tags)
            }
        case GET_CLUSTER_TAG_LAYER:
            let queryTag = action.payload.queryTag
            let tags = getFrequentTags(action.payload.data).slice(0,10)
            if (!state.children) { state.children = []}
            let newState = state
            newState.children[queryTag] = {
                tags: tags,
                tagsCoordination: getLevenClustersCoordinations(tags)
            }
            return newState
        default:
            return state
    }
}
