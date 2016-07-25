import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import { TransitionMotion, spring } from 'react-motion'
import Dimensions from 'react-dimensions'
import moment from 'moment'

import getLevenClustersCoordinations  from '../services/getLevenClustersCoordinations'

const autoTagTextStyle = {
    display: 'block',
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: '150%',
    fontWeight: '500',
}

const confirmedTagTextStyle =  {
    display: 'block',
    color: 'rgba(92, 184, 92, 0.85)',
    fontSize: '150%',
    fontWeight: '500',
}

const actorTextStyle = {
    marginTop: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border:'1px solid rgba(0, 0, 0, .05)',
    color: 'rgba(0, 0, 0, 0.35)',
    fontWeight: '400',
}

const tagDateStyle = {
    paddingTop: '3px',
    display: 'block',
    color: 'rgba(0, 0, 0, 0.15)',
    fontSize: '70%',
    fontWeight: '500',
}

class ClusteredTags extends Component {
    //constructor (props) {
    //    super(props)
    //}
    //componentWillReceiveProps() {
    //    console.log(this.props.tags)
    //    this.setState({
    //        tagsCoordination: this.getTagCoordination(this.props.tags)
    //    })
    //
    //}
    handleTagClick(mouseEvent, tag, entity) {
        mouseEvent.stopPropagation()
        if (this.isAutoTag(tag) &&  this.props.tagConfirm) {
            this.props.tagConfirm(tag,entity)
        } else if (this.props.tagConfirmCancel) {
            this.props.tagConfirmCancel(tag,entity)
        }
    }
    tagStartStyle(tags) {
        return tags.map((tag,index) => {
            return {
                key: `${index}`,
                style: {
                    lineHeight: 0,
                    width: 0,
                    height: 0,
                    opacity: 0,
                    top: (this.props.maxHeight? this.props.maxHeight/2: this.props.containerHeight/2),
                    left: this.props.containerWidth/2
                }
            }
        })
    }
    tagStyle(tags, tagCoordination) {
        return tags.map((tag,index) => {
            let textLength = tag.text.length
            let tagsWindowWidth = this.props.containerWidth
            let tagsWindowHeight = (this.props.maxHeight? this.props.maxHeight/2: this.props.containerHeight/2)
            let shiftTop = 0.05 //percentage
            let shiftLeft = 0.2 //percentage
            let tagX = tagCoordination[index][0]*(tagsWindowWidth-tagsWindowWidth*shiftTop)
            let tagY = tagCoordination[index][1]*(tagsWindowHeight-tagsWindowHeight*shiftLeft)
            if (textLength <= 2) textLength = textLength*3
            if (textLength > 2 && textLength <=6) textLength = textLength+1
            return {
                key: `${index}`,
                style: {
                    width: spring(textLength*12, {stiffness: 170, damping: 12}),
                    opacity: spring(1),
                    top: spring(tagY, {stiffness: 100, damping: 12}),
                    left: spring(tagX, {stiffness: 100, damping: 12}),
                }
            }
        })
    }
    tagEndStyle() {
        return {
            width: 0,
            height: 0,
            opacity: spring(0),
            top: (this.props.maxHeight? this.props.maxHeight/2: this.props.containerHeight/2),
            left: this.props.containerWidth/2
        }
    }
    isAutoTag(tag) {
        if (tag.auto === false) {
            return false
        } else {
            return true
        }
    }
    tagWithTransitionRender(tag, index, entity, tagStartStyle, tagStyle, tagEndStyle) {
        let style = {}
        style.cursor = 'pointer'
        style.backgroundColor = 'rgba(40, 80, 100, 0.05)'
        style.paddingBottom = '2%'
        style.paddingTop = '1%'
        style.marginLeft = '5px'
        style.marginBottom = '5px'
        return (
                <div
                    className="label"
                    style={style}
                    onClick={(mouseEvent) => this.handleTagClick(mouseEvent, tag, entity)}
                    key={index}
                >
                    <span style={this.isAutoTag(tag) ? autoTagTextStyle: confirmedTagTextStyle}>{tag.text}</span>
                    <span className='label label-pill label-default' style={actorTextStyle}>{tag.actor}</span>
                    <span style={tagDateStyle}>{`${moment(tag.time).format('DD.MM HH:mm')}`}</span>
                </div>

        )
        //return (
        //    <TransitionMotion
        //        defaultStyles={tagStartStyle}
        //        styles={tagStyle}
        //        willLeave={this.tagEndStyle}
        //        key={index}
        //    >
        //        { (interpolatingStyles) => {
        //            let style = interpolatingStyles[index].style
        //            style.cursor = 'pointer'
        //            style.position = 'absolute'
        //            style.backgroundColor = 'rgba(40, 80, 100, 0.05)'
        //            style.paddingBottom = '2%'
        //            style.paddingTop = '1%'
        //            return (
        //                <div
        //                    className="label"
        //                    style={style}
        //                    onClick={(mouseEvent) => this.handleTagClick(mouseEvent, tag, entity)}
        //                >
        //                    <span style={this.isAutoTag(tag) ? autoTagTextStyle: confirmedTagTextStyle}>{tag.text}</span>
        //                    <span className='label label-pill label-default' style={actorTextStyle}>{tag.actor}</span>
        //                    <span style={tagDateStyle}>{`${moment(tag.time).format('DD.MM HH:mm')}`}</span>
        //                </div>
        //            )
        //        }
        //        }
        //    </TransitionMotion>
        //)
    }
    tagsRender(entity, tags, tagCoordination) {
        let tagStartStyle = this.tagStartStyle(tags, tagCoordination)
        let tagStyle = this.tagStyle(tags, tagCoordination)
        return (
            tags.map( (tag ,index)=> {
                return this.tagWithTransitionRender(tag, index, entity, tagStartStyle, tagStyle)
            })
        )
    }
    tagWrapperStyle(tags) {
        let {containerWidth} = this.props
        if (tags.length > 0) {
            return {
                width: containerWidth + 'px',
                height: this.props.maxHeight + 'px'
            }
        } else {
            return {
                width: containerWidth + 'px',
                height: '0px'
            }
        }

    }
    render () {
        let entity = this.props.entity? this.props.entity: null
        let tags = this.props.tags
        let tagsCoordination = getLevenClustersCoordinations(this.props.tags)
        return (
            <div className="clear-fix" style={this.tagWrapperStyle(tags)}>
                {this.tagsRender(entity, tags, tagsCoordination)}
            </div>
        )
    }
}

export default Dimensions()(ClusteredTags)

