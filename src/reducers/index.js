import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import EventsReducer from './eventsReducer'
import DocumentsReducer from './documentsReducer'
import auth from './authReducer'
import ModalReducer from './modalReducer'
import tagsReducer from './tagsReducer'
import frequentTagsReducer from './frequentTagsReducer'

const rootReducer = combineReducers({
  auth: auth,
  events: EventsReducer,
  documents: DocumentsReducer,
  modal: ModalReducer,
  tags: tagsReducer,
  frequentTags: frequentTagsReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
