import axios from 'axios'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'

export function eventSearch (keyword) {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const RESTServerAddress = `localhost:${localStorage.getItem('port')}`
    const url = `http://${username}:${password}@${RESTServerAddress}/api/eventsearch?query=${keyword}`
    const request = axios.get(url)
    return {
        type: EVENT_SEARCH,
        payload: request
    }
}

export function fetchEvents () {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const RESTServerAddress = `localhost:${localStorage.getItem('port')}`
    const url = `http://${username}:${password}@${RESTServerAddress}/api/data/events`
    const request = axios.get(url)
    return {
        type: FETCH_EVENTS,
        payload: request
    }
}

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function logIn(props) {
    localStorage.setItem('username',props.username)
    localStorage.setItem('password',props.password)
    localStorage.setItem('port',props.port)
    const url = `http://${props.username}:${props.password}@localhost:${props.port}/api/data/events`
    console.log(url)
    const request = axios.get(url)
    return {
        type: LOG_IN,
        payload: request
    }
}

export function logOut() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.removeItem('port')
    return {
        type: LOG_OUT,
        payload: ''
    }
}