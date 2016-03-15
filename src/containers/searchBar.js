import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { eventSearch } from '../actions/index.js'

const searchBar = {
    marginTop: '250px'
};

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = { keyword: "" }
        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onInputChange(event) {
        this.setState({keyword: event.target.value})
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.props.eventSearch(this.state.keyword)
        this.setState({ keyword: "" })
    }

    render() {
        return (
            <div className="row" >
                <div className="col-xs-4 col-xs-offset-4" style={searchBar}>
                    <form onSubmit={this.onFormSubmit} className="input-group">
                        <input
                            placeholder="Search Events"
                            className="form-control"
                            value={this.state.keyword}
                            onChange={this.onInputChange}
                        />
                        <span className="input-group-btn">
                            <button type="submit"
                                    className="btn btn-secondary">
                                Search
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ eventSearch }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)