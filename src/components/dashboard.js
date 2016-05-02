import React from 'react';
import { Component } from 'react'

//import NavLink from '../components/NavLink'
import FrequentTagsList from '../containers/frequentTagsList'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <FrequentTagsList />
            </div>
        );
    }
}