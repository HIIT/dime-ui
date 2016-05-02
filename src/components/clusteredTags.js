import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import Dimensions from 'react-dimensions'
import TSNE from 'tsne-js';
import leven from 'leven'
import moment from 'moment'

import { tagConfirm } from '../actions/index.js'

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
    constructor (props) {
        super(props)
        let entity = props.entity
        let tags = props.tags
        this.state = {
            entity: entity,
            tags: tags,
            tagCoordination: this.getTagCoordination(tags)
        };
    }
    handleTagClick(mouseEvent, tag, entity) {
        mouseEvent.stopPropagation()
        if (this.isAutoTag(tag)) {
            this.props.tagConfirm(tag,entity)
        } else {
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
                    top: this.props.maxHeight/2,
                    left: this.props.containerWidth/2
                }
            }
        })
    }
    tagStyle(tags, tagCoordination) {
        return tags.map((tag,index) => {
            let textLength = tag.text.length
            let tagsWindowWidth = this.props.containerWidth
            let tagsWindowHeight = this.props.maxHeight
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
        let tags = this.state.entity.targettedResource.tags
        return {
            width: 0,
            height: 0,
            opacity: spring(0),
            top: this.props.maxHeight/2,
            left: this.props.containerWidth/2
        }
    }
    getTagCoordination(tags) {
        let tagTextsLevenized = tags.map((tag) => {return tag.text}).map((sourceText, index, textArray)=> {
            return textArray.map((targetText) => {
                return leven(sourceText, targetText)
            })
        })
        let model = new TSNE({
            dim: 2,
            perplexity: 5,
            earlyExaggeration: 1.0,
            learningRate: 100,
            nIter: 400,
            metric: 'euclidean'
        })
        model.init({
            data: tagTextsLevenized,
            type: 'dense'
        })
        model.run()
        let TagCoordination = model.getOutputScaled().map((coordinationArray)=> {
            return coordinationArray.map((coordination) => {
                return (coordination + 1)/2
            })
        });
        return TagCoordination

    }
    isAutoTag(tag) {
        if (tag.auto === false) {
            return false
        } else {
            return true
        }
    }
    tagWithTransitionRender(tag, index, entity, tagStartStyle, tagStyle, tagEndStyle) {
        return (
            <TransitionMotion
                defaultStyles={tagStartStyle}
                styles={tagStyle}
                willLeave={tagEndStyle}
                key={index}
            >
                { (interpolatingStyles) => {
                    let style = interpolatingStyles[index].style
                    style.cursor = 'pointer'
                    style.position = 'absolute'
                    style.backgroundColor = 'rgba(40, 80, 100, 0.05)'
                    style.paddingBottom = '2%'
                    style.paddingTop = '1%'
                    return (
                        <div
                            className="label"
                            style={style}
                            onClick={(mouseEvent) => this.handleTagClick(mouseEvent, tag, entity)}
                        >
                            <span style={this.isAutoTag(tag) ? autoTagTextStyle: confirmedTagTextStyle}>{tag.text}</span>
                            <span className='label label-pill label-default' style={actorTextStyle}>{tag.actor}</span>
                            <span style={tagDateStyle}>{`${moment(tag.time).format('DD.MM HH:mm')}`}</span>
                        </div>
                    )
                }
                }
            </TransitionMotion>
        )
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
        if (tags) {
            return {
                width: containerWidth + 'px',
                height: this.props.maxHeight + 'px'
            }
        }

    }
    render () {
        let { entity, tags, tagCoordination} = this.state
        return (
            <div className="clear-fix" style={this.tagWrapperStyle(tags)}>
                {this.tagsRender(entity, tags, tagCoordination)}
            </div>
        )
    }
}

export default Dimensions()(ClusteredTags)
