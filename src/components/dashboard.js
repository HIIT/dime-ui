import React from 'react';
import { Component } from 'react'

import EventsTimeline from '../containers/eventsTimeline'
import TagsTimeline from '../containers/tagsTimeline'
//import NavLink from '../components/NavLink'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <TagsTimeline />
                <hr />
                <EventsTimeline />
            </div>
        );
    }
}