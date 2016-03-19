import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'

import { tagConfirm } from '../actions/index.js'

const tagWrapper = {

}
class AnimatedTags extends Component {
    handleTagClick(tag, event) {
        this.props.tagConfirm(tag,event)
    }
    willLeave() {
        return {
            width: 0,
            height: 0,
            opacity: spring(0)
        }
    }
    tagWithTransitionRender(tag, index, event) {
        let tags = event.targettedResource.tags
        let defaultStyles = tags.map((tag,index) => {
            return {
                key: `${index}`,
                style: {
                    lineHeight: 0,
                    width: 0,
                    height: 0,
                    opacity: 0
                }
            }
        })
        let styles = tags.map((tag,index) => {
            let textLength = tag.text.length
            if (textLength <= 2) textLength = textLength*3
            if (textLength > 2 && textLength <=4) textLength = textLength+1
            return {
                key: `${index}`,
                style: {
                    lineHeight: spring(textLength*0.8, {stiffness: 170, damping: 26}),
                    width: spring(textLength*10, {stiffness: 170, damping: 12}),
                    height: spring(textLength*10, {stiffness: 170, damping: 12}),
                    opacity: spring(1)
                }
            }
        })
        return (
            <TransitionMotion
                defaultStyles={defaultStyles}
                styles={styles}
                willLeave={this.willLeave}
                key={index}
            >
                { (interpolatingStyles) => {
                        let style = interpolatingStyles[index].style
                        style.cursor = 'pointer'
                        style.marginRight = '-6px'
                        style.marginBottom = '-20px'
                        style.backgroundColor = 'rgba(40, 80, 100, 0.3)'
                        return (
                            <div
                                className="label label-pill label-info pull-xs-right"
                                style={style}
                                onClick={() => this.handleTagClick(tag,event)}
                            >
                                {tag.text}
                            </div>
                        )
                    }
                }
            </TransitionMotion>
        )
    }
    tagsRender(event) {
        return (
            event.targettedResource.tags.map( (tag ,index)=> {
                if (tag.auto === true ){
                    return this.tagWithTransitionRender(tag, index, event)
                }
            })
        )
    }
    render () {
        return (
            <div className="clear-fix" style={tagWrapper}>
                {this.tagsRender(this.props.events[this.props.eventIndex])}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { events: state.events }
}

export default connect(mapStateToProps, { tagConfirm })(AnimatedTags)