import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import EventsReducer from './eventsReducer'
import auth from './authReducer'

const rootReducer = combineReducers({
  auth: auth,
  events: EventsReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
