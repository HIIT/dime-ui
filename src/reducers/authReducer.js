import {
    LOG_IN, LOG_OUT
} from '../actions'

export default function auth(state = {}, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                username: action.payload.username,
                password: action.payload.password,
                isAuthenticated: true,
            })
        case LOG_OUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
            })
        default:
            return state
    }
}