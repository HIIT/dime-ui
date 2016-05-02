import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './components/app'
import EventsPage from './containers/eventsPage'
import DocumentsPage from './containers/documentsPage'
import DashBoard from './components/dashboard'
import LogInForm from './containers/logInForm'

//<IndexRoute component={EventsPage} />
export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/events" />
        <Route path="/events" component={EventsPage}/>
        <Route path="/documents" component={DocumentsPage}/>
        <Route path="/dashboard" component={DashBoard}/>
        <Route path="/login" component={LogInForm}/>
    </Route>
)