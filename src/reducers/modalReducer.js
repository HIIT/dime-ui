import { MODAL_OPEN, MODAL_CLOSE} from "../actions/index"
export default function(state = {
    isOpen: false,
    eventIndex: null
}, action) {
    switch (action.type) {
        case MODAL_OPEN:
            return {
                isOpen: true,
                eventIndex: action.payload.eventIndex,
                mousePosY: action.payload.mousePosY
            }
        case MODAL_CLOSE:
            return {
                isOpen: false,
                eventIndex: action.payload.eventIndex,
                mousePosY: null
            }
    }
    return state
}
