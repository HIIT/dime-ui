import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getLevenClustersCoordinations  from '../services/getLevenClustersCoordinations'

import { getClusterLayer0 } from '../actions/index'

class Profile extends Component {
    componentWillMount() {
        //this.props.getClusterLayer0()
    }
    render() {
        //let {frequentTagsAllTime, frequentTagsPreMonth, frequentTagsPreWeek, frequentTagsPreTwentyFour, frequentTagsPreOne} = this.props
        //let tags = this.props.clusterNav
        //let coordination = getLevenClustersCoordinations(tags)
        return (
            <div>
                <div className="card">
                    <div className="card-block" style={{height: window.innerHeight*0.88}}>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        clusterNav: state.clusterNav,
    }
}

export default connect(
    mapStateToProps,
    {
        getClusterLayer0
    }
)(Profile)