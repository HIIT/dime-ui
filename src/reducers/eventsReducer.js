import moment from 'moment'
import { EVENT_SEARCH, FETCH_EVENTS} from "../actions/index"
import { TAG_CONFIRM, TAG_CONFIRM_CANCEL} from "../actions/index"
export default function(state = [], action) {
    switch (action.type) {
        case EVENT_SEARCH:
            //console.log(JSON.parse(action.payload.data))
            return [...action.payload.data.docs] //always return a new sate is the redux way
        case FETCH_EVENTS:
            console.log(action.payload.data.slice(0,8))
            return [...action.payload.data.slice(0,8)]
        case TAG_CONFIRM:
            let targetEventIndex = state.indexOf(action.payload.event)
            let targetTagIndex = action.payload.event.targettedResource.tags.indexOf(action.payload.tag)
            action.payload.tag.time = moment().toISOString()
            action.payload.tag.auto = false
            action.payload.event.targettedResource.tags[targetTagIndex] = action.payload.tag
            state[targetEventIndex] = action.payload.event
            return [...state]
        case TAG_CONFIRM_CANCEL:
            let targetCancelEventIndex = state.indexOf(action.payload.event)
            let targetCancelTagIndex = action.payload.event.targettedResource.tags.indexOf(action.payload.tag)
            action.payload.tag.time = moment().toISOString()
            action.payload.tag.auto = true
            action.payload.event.targettedResource.tags[targetCancelTagIndex] = action.payload.tag
            state[targetCancelEventIndex] = action.payload.event
            return [...state]
    }
    return state
}