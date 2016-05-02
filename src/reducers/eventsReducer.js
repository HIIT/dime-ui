import moment from 'moment'
import _ from 'underscore'
import Lazy from 'lazy.js'

import { EVENT_SEARCH, FETCH_EVENTS} from "../actions/index"
import { TAG_CONFIRM, TAG_CONFIRM_CANCEL} from "../actions/index"
export default function(state = [], action) {
    switch (action.type) {
        case EVENT_SEARCH:
            //console.log(JSON.parse(action.payload.data))
            return [...action.payload.data.docs] //always return a new sate is the redux way
        case FETCH_EVENTS:
            //console.log(action.payload.data.docs.slice(0,20))
            //console.log(action.payload.data)
            //return [...action.payload.data.docs.slice(0,20)]
            return Lazy(action.payload.data).reverse().toArray()
        case TAG_CONFIRM:
            let newStateWithConfirmTags = state
            newStateWithConfirmTags.map((event)=> {
                if (event.targettedResource.id === action.payload.data.id) {
                    let eventWithNewTags = event
                    eventWithNewTags.targettedResource.tags = action.payload.data.tags
                    return eventWithNewTags
                } else return event
            })
            //console.log(newStateWithConfirmTags)
            return [...newStateWithConfirmTags]
        case TAG_CONFIRM_CANCEL:
            let newStateWithTagRemoved = state
            newStateWithTagRemoved.map((event)=> {
                if (event.targettedResource.id === action.payload.data.id) {
                    let eventWithNewTags = event
                    eventWithNewTags.targettedResource.tags = action.payload.data.tags
                    return eventWithNewTags
                } else return event
            })
            //console.log(newStateWithTagRemoved)
            return [...newStateWithTagRemoved]
        default:
            return state
    }
    //return state
}