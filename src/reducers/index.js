import { combineReducers } from 'redux';
import EventsReducer from './eventsReducer'
const rootReducer = combineReducers({
  events: EventsReducer
});

export default rootReducer;
