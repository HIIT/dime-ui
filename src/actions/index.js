import axios from 'axios'
import moment from 'moment'
import store from 'store'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'
const dimeServerAddress = 'localhost:8080'

export function eventSearch (keyword) {
    const username = store.get('username')
    const password = store.get('password')
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
    const username = store.get('username')
    const password = store.get('password')
    //const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
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

export const FETCH_DOCUMENTS = 'FETCH_DOCUMENTS'
export function fetchDocuments () {
    const username = store.get('username')
    const password = store.get('password')
    const url = `http://${dimeServerAddress}/api/data/informationelements`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: FETCH_DOCUMENTS,
        payload: request
    }
}

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function logIn(props) {
    const username = store.set('username',props.username)
    const password = store.set('password',props.password)
    //const url = `http://${dimeServerAddress}/api/data/event/1`
    //const request = axios.get(url, {
    //    auth: {
    //        username: username,
    //        password: password
    //    }
    //})
    return {
        type: LOG_IN,
        payload: 'login'
    }
}

export function logOut() {
    store.remove('username')
    store.remove('password')
    return {
        type: LOG_OUT,
        payload: 'logout'
    }
}

export const TAG_CONFIRM = 'TAG_CONFIRM'
export const TAG_CONFIRM_CANCEL = 'TAG_CONFIRM_CANCEL'

export function tagConfirm(tag, entity) {
    tag.auto = false
    tag.actor = 'dime-ui'
    tag.time = moment().toISOString()
    let informationElement = entity.targettedResource? entity.targettedResource: entity

    const username = store.get('username')
    const password = store.get('password')
    const url = `http://${dimeServerAddress}/api/data/informationelement/${informationElement.id}/addtag`
    const config =  {
        url: url,
        method: 'post',
        data: tag,
        auth: {
            username: username,
            password: password
        }
    }
    const request = axios(config)
    return {
        type: TAG_CONFIRM,
        payload: request
    }
}

export function tagConfirmCancel(tag, entity) {
    tag.auto = true
    tag.actor = 'dime-ui'
    tag.time = moment().toISOString()
    let informationElement = entity.targettedResource? entity.targettedResource: entity

    const username = store.get('username')
    const password = store.get('password')

    //remove && add again
    //const removalUrl = `http://${dimeServerAddress}/api/data/informationelement/${event.targettedResource.id}/removetag`
    //const removalConfig =  {
    //    url: removalUrl,
    //    method: 'post',
    //    data: tag,
    //    auth: {
    //        username: username,
    //        password: password
    //    }
    //}
    //let request = new Promise((resolve, reject) => {
    //    axios(removalConfig).then((removalResponse)=> {
    //        const addUrl = `http://${dimeServerAddress}/api/data/informationelement/${event.targettedResource.id}/addtag`
    //        const addConfig =  {
    //            url: addUrl,
    //            method: 'post',
    //            data: tag,
    //            auth: {
    //                username: username,
    //                password: password
    //            }
    //        }
    //        axios(addConfig).then((addResponse)=> {
    //            resolve(addResponse)
    //        })
    //    })
    //})

    //simply add, which will overwritten the exising one
    const addUrl = `http://${dimeServerAddress}/api/data/informationelement/${informationElement.id}/addtag`
    const addConfig =  {
        url: addUrl,
        method: 'post',
        data: tag,
        auth: {
            username: username,
            password: password
        }
    }
    let request = axios(addConfig)

    return {
        type: TAG_CONFIRM_CANCEL,
        payload: request
    }
}

export const MODAL_CLOSE = 'MODAL_CLOSE'
export const MODAL_OPEN = 'MODAL_OPEN'

export function setModalOpen(index, posY) {
    return {
        type: MODAL_OPEN,
        payload: {
            entityIndex: index,
            mousePosY: posY
        }
    }
}
export function setModalClose(index) {
    return {
        type: MODAL_CLOSE,
        payload: {
            entityIndex: index,
            mousePosY: null
        }
    }
}

export const FETCH_TAGS = 'FETCH_TAGS'

export function fetchTags () {
    const username = store.get('username')
    const password = store.get('password')
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    //const url = `http://${dimeServerAddress}/api/eventsearch?query=hiit`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: FETCH_TAGS,
        payload: request
    }
}

export const GET_FREQUENT_TAGS = 'GET_FREQUENT_TAGS'

export function getFrequentTags () {
    const username = store.get('username')
    const password = store.get('password')
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    //const url = `http://${dimeServerAddress}/api/eventsearch?query=hiit`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_FREQUENT_TAGS,
        payload: request
    }
}