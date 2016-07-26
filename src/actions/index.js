import axios from 'axios'
import moment from 'moment'
import store from 'store'

export const EVENT_SEARCH = 'EVENT_SEARCH'
export const FETCH_EVENTS = 'FETCH_EVENTS'
const dimeServerAddress = 'fichh.us.to:8889'
const username = 'testuser'
const password = 'testuser123'
    
export function eventSearch (keyword) {
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

export const GET_ALL_TIME_FREQUENT_TAGS = 'GET_ALL_TIME_FREQUENT_TAGS'

export function getAllTimeFrequentTags () {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_ALL_TIME_FREQUENT_TAGS,
        payload: request
    }
}

export const GET_CLUSTER_LAYER_0 = 'GET_CLUSTER_LAYER_0'

export function getClusterLayer0() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_CLUSTER_LAYER_0,
        payload: request
    }
}

export const GET_CLUSTER_TAG_LAYER = 'GET_CLUSTER_TAG_LAYER'

export function getClusterTagLayer() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_CLUSTER_LAYER_0,
        payload: request
    }
}

export const GET_PRE_MONTH_FREQUENT_TAGS = 'GET_PRE_MONTH_FREQUENT_TAGS'

export function getPreviousMonthFrequentTags() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true&after=${moment().subtract(1, 'months')}`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_PRE_MONTH_FREQUENT_TAGS,
        payload: request
    }
}

export const GET_PRE_WEEK_FREQUENT_TAGS = 'GET_PRE_WEEK_FREQUENT_TAGS'

export function getPreviousWeekFrequentTags() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true&after=${moment().subtract(7, 'days')}`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_PRE_WEEK_FREQUENT_TAGS,
        payload: request
    }
}

export const GET_PRE_24_FREQUENT_TAGS = 'GET_PRE_24_FREQUENT_TAGS'

export function getPreviousTwentyFourFrequentTags() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true&after=${moment().subtract(24, 'hours')}`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_PRE_24_FREQUENT_TAGS,
        payload: request
    }
}

export const GET_PRE_1_FREQUENT_TAGS = 'GET_PRE_1_FREQUENT_TAGS'

export function getPreviousOneHoursFrequentTags() {
    const url = `http://${dimeServerAddress}/api/data/events?includePlainTextContent=true&after=${moment().subtract(1, 'hours')}`
    const request = axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    return {
        type: GET_PRE_1_FREQUENT_TAGS,
        payload: request
    }
}