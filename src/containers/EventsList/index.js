import { React, Component } from 'react'
import { connect } from 'react-redux'
import EntitiesList from './EntitiesList'
import { createStructuredSelector } from 'reselect';
import {
  selectEventsListData,
} from './selectors';
import { loadEvents } from './actions'

class EntitiesList extends Component {
    componentWillMount() {
    	this.props.loadEvents()
    }
    render() {
        return (
            <EntitiesList entities={this.props.entities}/>
        )
    }
}

const mapStateToProps = createStructuredSelector({
  entities: selectEventsListData()
})

export default connect(mapStateToProps, { loadEvents })(EventsList)