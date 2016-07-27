import React from 'react';
import { Component } from 'react'
import Transition from 'react-motion-ui-pack'
//import { connect } from 'react-redux'
//
//import { tagConfirmCancel, tagConfirm} from '../actions/index'

class ListedTags extends Component {
    handleTagClick(tag, entity) {
        if (this.props.tagConfirmCancel) {
            this.props.tagConfirmCancel(tag,entity)
        }
        if (this.props.tagConfirm) {
            this.props.tagConfirm(tag,entity)
        }
    }
    tagsRender(entity, tags) {
        return (
            tags.map( (tag ,index)=> {
                return (
                    //<Transition
                    //    key={index}
                    //    component="false"
                    //    appear={{
                    //        opacity: 0
                    //     }}
                    //    enter={{
                    //        opacity: 1,
                    //      }}
                    //    leave={{
                    //        opacity: 0
                    //     }}
                    //>
                    <span key={index}
                          className={`${this.props.className}`}
                          style={this.props.style}
                          onClick={() => this.handleTagClick(tag,entity)}
                    >
                        {tag.text}
                    </span>
                    //</Transition>
                )
            })
        )
    }
    render () {
        let {entity, tags} = this.props
        return (
            <div className="clearfix">{this.tagsRender(entity, tags)}</div>
        )
    }
}

export default ListedTags

