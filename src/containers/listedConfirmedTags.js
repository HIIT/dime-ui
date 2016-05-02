import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
//
import { tagConfirmCancel } from '../actions/index'
import ListedTags from '../components/listedTags.js'

const confirmedTagStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgba(92, 184, 92, 0.85)',
    fontWeight: '400',
    marginRight: '3px',
    marginBottom: '3px'
}


class ListedConfirmedTags extends Component {
    render () {
        return (
            <ListedTags
                        className='label label-pill label-success pull-xs-right'
                        entity={this.props.entity}
                        tags={this.props.tags}
                        style={confirmedTagStyle}
                        tagConfirmCancel={this.props.tagConfirmCancel}

            />
        )
    }
}

export default connect(null, { tagConfirmCancel })(ListedConfirmedTags)
//export default ListedConfirmedTags
