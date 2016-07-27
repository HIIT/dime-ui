import { Route, IndexRedirect } from 'react-router'
import React from 'react'

import requiresAuth from './containers/requiresAuth'
import App from './components/app'
import EventsPage from './containers/eventsPage'
import DocumentsPage from './containers/documentsPage'
import DashBoard from './components/dashboard'
import Home from './components/home'
import LogInForm from './containers/logInForm'

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="home" component={Home} />
        <Route path="login" component={LogInForm} />
        <Route path="events" component={requiresAuth(EventsPage)}/>
        <Route path="documents" component={requiresAuth(DocumentsPage)}/>
        <Route path="dashboard" component={requiresAuth(DashBoard)}/>
    </Route>
)