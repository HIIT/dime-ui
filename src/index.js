import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import { Router, browserHistory} from 'react-router'
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux'

import reducers from './reducers'
import routes from './routes'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const middleware = routerMiddleware(browserHistory)
const store = createStoreWithMiddleware(
    reducers,
    applyMiddleware(middleware)
)
const history = syncHistoryWithStore(browserHistory, store)
//history.listen(location => console.log(location))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
  , document.querySelector('.reactRoot'));