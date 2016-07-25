import React from 'react';
import { Component } from 'react'

//import NavLink from '../components/NavLink'
import FrequentTagsList from '../containers/frequentTagsList'
import Profile from '../containers/profile'

export default class DashBoard extends Component {
    render() {
        return (
            <div
                className="container-fluid"
            >
                <div className="col-xs-10">
                    <Profile />
                </div>
                <div className="col-xs-2">
                    <FrequentTagsList />
                </div>
            </div>
        );
    }
}