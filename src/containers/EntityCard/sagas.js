import { take, call, put, select, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { CLICK_ENTITY } from './constants'
import request from 'utils/request'
import { selectAuth } from './selectors'
import { entityDeleteSucess, entityDeleteError } from './actions'
export function* deleteEntity(entityID) {
  const { username, password } = yield select(selectAuth())
  const baseURL = ''
  const requestURL = `${baseURL}/api/data/${entityID}` //TODO: is it possible to delete event or informationElement by ID?
  const respond = yield call(request, requestURL)
  if (!events.err) {
    yield put(entityDeleteSucess(respond.data))
  } else {
    yield put(entityDeleteError(respond.err))
  }
}

export function* deleteEntityWatcher() {
  while (yield take() {
    yield call(deleteEntity) //TODO: how to pass arguemnts in deleteEntity()
  }
}

export function* eventsData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(deleteEntityWatcher)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [
  eventsData,
]
