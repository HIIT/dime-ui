import { EVENT_SEARCH, FETCH_EVENTS} from "../actions/index"
export default function(state = [], action) {
    switch (action.type) {
        case EVENT_SEARCH:
            //console.log(JSON.parse(action.payload.data).docs)
            return [...JSON.parse(action.payload.data).docs] //always return a new sate is the redux way
        case FETCH_EVENTS:
            return [...JSON.parse(action.payload.data)]
    }
    return state
}