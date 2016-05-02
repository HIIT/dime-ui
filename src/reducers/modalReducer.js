import { MODAL_OPEN, MODAL_CLOSE} from "../actions/index"
export default function(state = {
    isOpen: false,
    entityIndex: null
}, action) {
    switch (action.type) {
        case MODAL_OPEN:
            return {
                isOpen: true,
                entityIndex: action.payload.entityIndex,
                mousePosY: action.payload.mousePosY
            }
        case MODAL_CLOSE:
            return {
                isOpen: false,
                entityIndex: action.payload.entityIndex,
                mousePosY: null
            }
    }
    return state
}
