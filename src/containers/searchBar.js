import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { eventSearch } from '../actions/index.js'

const searchBar = {
    position: 'fixed',
    top: '1vh',
    left: '0vw',
    zIndex:'1040', //z-index for NavBAr is 1030
};

const boxShadow = {
    WebkitBoxShadow: '0 15px 10px -10px rgba(0, 0, 0, 0.2) , 0 1px 4px rgba(0, 0, 0, 0) , 0 0 40px rgba(0, 0, 0, 0) inset',
    MoxBoxShadow: '0 15px 10px -10px rgba(0, 0, 0, 0.2) , 0 1px 4px rgba(0, 0, 0, 0) , 0 0 40px rgba(0, 0, 0, 0) inset',
    BoxShadow: '0 15px 10px -10px rgba(0, 0, 0, 0.2) , 0 1px 4px rgba(0, 0, 0, 0) , 0 0 40px rgba(0, 0, 0, 0) inset'
}

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
            <div className="row">
                <div className="col-xs-4 col-xs-offset-4" style={searchBar}>
                    <form onSubmit={this.onFormSubmit}
                          className="input-group"
                          style={boxShadow}>
                        <input
                            placeholder="Keywords"
                            className="form-control"
                            value={this.state.keyword}
                            onChange={this.onInputChange}
                        />
                        <span className="input-group-btn">
                            <button type="submit"
                                    className="btn btn-secondary hidden-sm-down">
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