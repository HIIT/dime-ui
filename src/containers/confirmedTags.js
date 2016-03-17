import React from 'react';
import { Component } from 'react'
import dragula from 'react-dragula'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Transition from 'react-motion-ui-pack'

import { tagConfirmCancel } from '../actions/index.js'

const tagStyle = {
    marginLeft: '2px',
    marginBottom: '2px',
    cursor: 'pointer'
}

class Tags extends Component {
    handleTagClick(tag, event) {
        this.props.tagConfirmCancel(tag,event)
    }
    tagsRender(event) {
        return (
            event.targettedResource.tags.map( (tag ,index)=> {
                if (tag.auto === false ) {
                    return (
                        <Transition
                            key={index}
                            component="false"
                            appear={{
                                opacity: 0
                             }}
                            enter={{
                                opacity: 1,
                              }}
                            leave={{
                                opacity: 0
                             }}
                        >
                        <div key={index}
                             className="label label-pill label-info pull-xs-left"
                             style={tagStyle}
                             onClick={() => this.handleTagClick(tag,event)}
                        >
                            {tag.text}
                        </div>
                        </Transition>
                    )
                }
            })
        )
    }
    render () {
        return (
            <div className='container'>{this.tagsRender(this.props.events[this.props.eventIndex])}</div>
        )
    }
    componentDidMount() {
        var container = ReactDOM.findDOMNode(this);
        dragula([container]);
    }
}

function mapStateToProps(state) {
    return { events: state.events }
}

export default connect(mapStateToProps, { tagConfirmCancel })(Tags)