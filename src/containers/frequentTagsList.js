import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { getFrequentTags } from '../actions/index.js'

const tagCard = {
    margin: '0 -22px -10px 0',
    display: 'inline-block',
    transform: 'scale(0.7,0.7)'
}

class FrequentTagsList extends Component {
    componentWillMount() {
        this.props.getFrequentTags()
    }
    render() {
        let {frequentTags} = this.props
        console.log(frequentTags)
        return (
            <div >
                {frequentTags.map((tag, index) => {
                    return (
                        <div key={index} style={tagCard}>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary btn-sm">{tag.text}</button>
                                <button type="button" className="btn btn-info-outline btn-sm">{tag.frequency}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { frequentTags: state.frequentTags }
}

export default connect(mapStateToProps, {getFrequentTags})(FrequentTagsList)

