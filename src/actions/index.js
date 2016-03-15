import axios from 'axios'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'
const dimeServerAddress = 'localhost:3000'

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
    const url = `http://${dimeServerAddress}/api/data/events`
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