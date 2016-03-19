import axios from 'axios'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'
const dimeServerAddress = 'localhost:8080'

export function eventSearch (keyword) {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const url = `http://${dimeServerAddress}/api/eventsearch?query=${keyword}`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: EVENT_SEARCH,
        payload: request
    }
}

export function fetchEvents () {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: FETCH_EVENTS,
        payload: request
    }
}

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function logIn(props) {
    const username = localStorage.setItem('username',props.username)
    const password = localStorage.setItem('password',props.password)
    const url = `http://${dimeServerAddress}/api/data/event/1`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: LOG_IN,
        payload: request
    }
}

export function logOut() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    return {
        type: LOG_OUT,
        payload: ''
    }
}

export const TAG_CONFIRM = 'TAG_CONFIRM'
export const TAG_CONFIRM_CANCEL = 'TAG_CONFIRM_CANCEL'

export function tagConfirm(tag, event) {
    return {
        type: TAG_CONFIRM,
        payload: {tag, event}
    }
}

export function tagConfirmCancel(tag, event) {
    return {
        type: TAG_CONFIRM_CANCEL,
        payload: {tag, event}
    }
}

export const MODAL_CLOSE = 'MODAL_CLOSE'
export const MODAL_OPEN = 'MODAL_OPEN'

export function setModalOpen(index, posY) {
    return {
        type: MODAL_OPEN,
        payload: {
            eventIndex: index,
            mousePosY: posY
        }
    }
}
export function setModalClose(index) {
    return {
        type: MODAL_CLOSE,
        payload: {
            eventIndex: index,
            mousePosY: null
        }
    }
}