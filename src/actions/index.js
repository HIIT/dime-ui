import axios from 'axios'

const username = 'chh'
const password = '12345'
const RESTServerAddress = 'localhost:3000'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'

export function eventSearch (keyword) {
    const url = `http://${username}:${password}@${RESTServerAddress}/api/eventsearch?query=${keyword}`
    const request = axios.get(url)
    return {
        type: EVENT_SEARCH,
        payload: request
    }
}

export function fetchEvents () {
    const url = `http://${username}:${password}@${RESTServerAddress}/api/data/events`
    //console.log(url)
    const request = axios.get(url)
    return {
        type: FETCH_EVENTS,
        payload: request
    }
}