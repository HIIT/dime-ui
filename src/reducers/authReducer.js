import {
    LOG_IN, LOG_OUT
} from '../actions'

export default function auth(state = {
    isAuthenticated: localStorage.getItem('username') ? true : false
}, action) {
    switch (action.type) {
        case LOG_IN:
            console.log(action.payload.data)
            return Object.assign({}, state, {
                isAuthenticated: true,
            })
            //if (typeof action.payload.data !== 'undefined') {
            //
            //} else {
            //    return Object.assign({}, state, {
            //        isAuthenticated: false,
            //    })
            //}
        case LOG_OUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
            })
        default:
            return state
    }
}