import React from 'react';
import { Component } from 'react'
import NavLink from '../components/navLink'

export default class Home extends Component {
    render() {
        return (
            <div
                className="container-fluid"
            >
                <h5>Hello!</h5>
                <h6>Welcome to Digital Work Me (DiMe) Server</h6>
                <NavLink to="login">Log In</NavLink>
            </div>
        );
    }
}