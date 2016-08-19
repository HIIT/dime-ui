/**
 * Create the store with asynchronously loaded reducers
 */
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import { fromJS, Iterable } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import createReducer from './reducers';
import { loadState, saveState } from './localStorage';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const stateTransformer = (state) => {
      if (Iterable.isIterable(state)) return state.toJS();
      return state;
    };
    const logger = createLogger({
      stateTransformer,
    });
    middlewares.push(logger);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const persistedState = loadState();
  const store = createStore(
    createReducer(),
    fromJS(persistedState),
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;

  // Save Auth State in LocalStorage
  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth,
    });
  }, 1000));

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    System.import('./reducers').then((reducerModule) => {
      const createReducers = reducerModule.default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}
