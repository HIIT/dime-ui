
import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
                <a className="navbar-brand" href="#">DiMe dashboard</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Documents</a>
                    </li>
                    <li className="nav-item pull-xs-right">
                        <a className="nav-link" href="#">Log In</a>
                    </li>
                </ul>
            </nav>
        )
    }
}