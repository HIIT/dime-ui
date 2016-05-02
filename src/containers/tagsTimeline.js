import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import d3KitTimeline from 'd3kit-timeline'
import moment from 'moment'

import { fetchTags } from '../actions/index.js'

class TagsTimeLine extends Component {
    componentWillMount() {
        this.props.fetchTags()
    }
    render() {
        return (
            <div ref="timeline"></div>
        );
    }
    componentDidMount () {

    }
    componentDidUpdate() {
        let { tags } = this.props
        let el = this.refs.timeline
        //console.log(el.offsetWidth)
        //console.log(tags)
        var timeline = new d3KitTimeline(el, {
            margin: {left: 40, right: 20, top: 20, bottom: 20},
            direction: 'down',
            initialWidth: el.offsetWidth,
            initialHeight: el.offsetHeight,
            linkColor: 'rgba(0,0,0,0.1)',
            labelBgColor: 'rgba(0,0,0,0.4)',
            labelTextColor: 'rgba(255,255,255,1)',
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
                return d.text
            },
            //timeFn: function(d) {
            //    let t = new Date(d.time)
            //    return t.getUTCMinutes()
            //}
        })
        timeline.axis.ticks(d3.time.days, 5)
        timeline.data(tags).resizeToFit();
    }
    componentWillUnmount () {
        //let el = this.getDOMNode();
    }
}

function mapStateToProps(state) {
    return { tags: state.tags }
}

export default connect(mapStateToProps, {fetchTags})(TagsTimeLine)
