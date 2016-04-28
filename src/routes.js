import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './components/app'
import EventsPage from './components/eventsPage'
import DocumentsPage from './components/documentsPage'
import LogInForm from './containers/logInForm'

//<IndexRoute component={EventsPage} />
export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/events" />
        <Route path="/events" component={EventsPage}/>
        <Route path="/documents" component={DocumentsPage}/>
        <Route path="/login" component={LogInForm}/>
    </Route>
)