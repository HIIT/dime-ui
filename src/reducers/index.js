import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import EventsReducer from './eventsReducer'
import DocumentsReducer from './documentsReducer'
import auth from './authReducer'
import ModalReducer from './modalReducer'
import tagsReducer from './tagsReducer'
import frequentTagsAllTimeReducer from './frequentTagsAllTimeReducer'
import frequentTagsPreMonthReducer from './frequentTagsPreMonthReducer'
import frequentTagsPreWeekReducer from './frequentTagsPreWeekReducer'
import frequentTagsPreTwentyFourReducer from './frequentTagsPreTwentyFourReducer'
import frequentTagsPreOneReducer from './frequentTagsPreOneReducer'
import clusterNav from './clusterNav'

const rootReducer = combineReducers({
  auth: auth,
  events: EventsReducer,
  documents: DocumentsReducer,
  modal: ModalReducer,
  tags: tagsReducer,
  frequentTagsAllTime: frequentTagsAllTimeReducer,
  frequentTagsPreMonth: frequentTagsPreMonthReducer,
  frequentTagsPreWeek: frequentTagsPreWeekReducer,
  frequentTagsPreTwentyFour: frequentTagsPreTwentyFourReducer,
  frequentTagsPreOne: frequentTagsPreOneReducer,
  form: formReducer,
  clusterNav: clusterNav,
});

export default rootReducer;
