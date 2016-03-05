
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NavBar extends Component {
    render() {
        return (
            <header className="navbar navbar-fixed-top navbar-dark bg-inverse" role="banner">
                <nav className="nav navbar-nav">
                    <a className="navbar-brand" href="#">DiMe dashboard</a>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link to="/events" className="nav-link" activeClassName="active">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/documents" className="nav-link" activeClassName="active">Documents</Link>
                        </li>
                        <li className="nav-item pull-xs-right">
                            <a className="nav-link" href="#">Log In</a>
                        </li>
                    </ul>
                </nav>
            </header>

        )
    }
}