import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import {
    getAllTimeFrequentTags,
    getPreviousWeekFrequentTags,
    getPreviousMonthFrequentTags,
    getPreviousTwentyFourFrequentTags,
    getPreviousOneHoursFrequentTags
} from '../actions/index.js'

const tagCard = {
    //margin: '0 -22px -10px 0',
    //display: 'inline-block',
    //transform: 'scale(0.7,0.7)'
}

class FrequentTagsList extends Component {
    componentWillMount() {
        this.props.getAllTimeFrequentTags()
        this.props.getPreviousMonthFrequentTags()
        this.props.getPreviousWeekFrequentTags()
        this.props.getPreviousTwentyFourFrequentTags()
        this.props.getPreviousOneHoursFrequentTags()
    }
    renderTags(tags) {
        return (
            <div
                style={{lineHeight: '0'}}>
                {tags.map((tag, index) => {
                    return (
                        <span key={index}
                              className="label label-primary"
                              style={{marginRight: '1px', marginBottom: '1px', marginTop: '1px', backgroundColor: 'rgba(0,0,0,.05', color: 'rgba(0,0,0,.4', fontSize: '10px'}}
                        >
                            {tag.text}
                            <span
                                className="label label-default"
                                style={{marginLeft: '3px', backgroundColor: 'rgba(0,0,0,.1'}}
                            >
                                {tag.frequency}
                            </span>
                        </span>
                    )
                })}
            </div>
        )
    }
    render() {
        let {frequentTagsAllTime, frequentTagsPreMonth, frequentTagsPreWeek, frequentTagsPreTwentyFour, frequentTagsPreOne} = this.props
        return (
            <div >
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">All Time</h4>
                        {this.renderTags(frequentTagsAllTime)}
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Last Month</h4>
                        {this.renderTags(frequentTagsPreMonth)}
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Last Week</h4>
                        {this.renderTags(frequentTagsPreWeek)}
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">In 24 Horus</h4>
                        {this.renderTags(frequentTagsPreTwentyFour)}
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">In Previous One Hour</h4>
                        {this.renderTags(frequentTagsPreOne)}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        frequentTagsAllTime: state.frequentTagsAllTime,
        frequentTagsPreMonth: state.frequentTagsPreMonth,
        frequentTagsPreWeek: state.frequentTagsPreWeek,
        frequentTagsPreTwentyFour: state.frequentTagsPreTwentyFour,
        frequentTagsPreOne: state.frequentTagsPreOne,
    }
}

export default connect(
    mapStateToProps,
    {
        getAllTimeFrequentTags,
        getPreviousWeekFrequentTags,
        getPreviousMonthFrequentTags,
        getPreviousTwentyFourFrequentTags,
        getPreviousOneHoursFrequentTags
    }
)(FrequentTagsList)