import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
//
import { tagConfirm } from '../actions/index'

import ListedTags from '../components/listedTags.js'

const unconfirmedTagStyle = {
    backgroundColor: 'rgba(255,255,255,1)',
    border:'1px solid rgba(0, 0, 0, .2)',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '200',
    cursor: 'pointer',
    marginRight: '3px',
    marginBottom: '3px'
}

class ListedUnconfirmedTags extends Component {
    render () {
        return (
            <ListedTags
                        className='label label-pill label-default pull-xs-right'
                        entity={this.props.entity}
                        tags={this.props.tags}
                        style={unconfirmedTagStyle}
                        tagConfirm={this.props.tagConfirm}
            />
        )
    }
}

//export default ListedUnconfirmedTags
export default connect(null, { tagConfirm })(ListedUnconfirmedTags)
