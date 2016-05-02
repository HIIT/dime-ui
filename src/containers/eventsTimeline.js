import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import d3KitTimeline from 'd3kit-timeline'
import moment from 'moment'

import { fetchEvents } from '../actions/index.js'

class EventsTimeLine extends Component {
    componentWillMount() {
        this.props.fetchEvents()
    }
    render() {
        return (
            <div ref="eventTimeline"></div>
        );
    }
    componentDidMount () {

    }
    componentDidUpdate() {
        let { events } = this.props
        let el = this.refs.eventTimeline
        //console.log(el.offsetWidth)
        //console.log(events)
        var timeline = new d3KitTimeline(el, {
            margin: {left: 40, right: 20, top: 120, bottom: 20},
            direction: 'down',
            initialWidth: el.offsetWidth,
            initialHeight: el.offsetHeight,
            linkColor: 'rgba(0,0,0,0.3)',
            labelBgColor: 'rgba(0,100,130,0)',
            labelTextColor: 'rgba(0,0,0,0.6)',
            labella: {
                minPos: 0,
                maxPos: el.offsetWidth -100,
                algorithm: 'overlap',
                lineSpacing: 1,
                nodeSpacing: 2,
                density: 0.7,
            },
            layerGap: 5,
            textFn: function(d){
                return d.targettedResource.title
            },
            timeFn: function(d) {
                //let t = new Date(d.timeCreated)
                return d.timeCreated
            }
        })
        timeline.axis.ticks(d3.time.days, 5)
        timeline.data(events).resizeToFit();
    }
    componentWillUnmount () {
        //let el = this.getDOMNode();
    }
}

function mapStateToProps(state) {
    return { events: state.events }
}

export default connect(mapStateToProps, {fetchEvents})(EventsTimeLine)
