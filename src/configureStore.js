import { createStore, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle'
import reducers from './reducers'
import { loadState, saveState } from './localStorage'
import promiseMiddleware from 'redux-promise'
import createLoggerMiddleware from 'redux-logger'

const configureStore = () => {
    const middleware = [
        promiseMiddleware
    ];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(createLoggerMiddleware())
    };

    const persistedState = loadState();
    const store = createStore(
        reducers,
        persistedState,
        applyMiddleware(...middleware)
    );

    store.subscribe(throttle(() => {
        saveState({
            auth: store.getState().auth
        })
    }, 1000));

    return store
}

export default configureStore