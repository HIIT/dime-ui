
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import { logOut } from '../actions'

class NavBar extends Component {
    onClickLogOut() {
        this.props.logOut()
        this.props.push('/login')
    }
    render() {
        const { isAuthenticated } = this.props
        return (
            <header className="navbar navbar-fixed-top navbar-dark bg-inverse" role="banner">
                <nav className="nav navbar-nav">
                    <a className="navbar-brand" href="#">DiMe dashboard</a>
                    <ul className="nav navbar-nav">
                        <li className={`nav-item ${isAuthenticated ? '' : 'invisible'}`}>
                            <Link to="/events" className="nav-link" activeClassName="active">Events</Link>
                        </li>
                        <li className={`nav-item ${isAuthenticated ? '' : 'invisible'}`}>
                            <Link to="/documents" className="nav-link" activeClassName="active">Documents</Link>
                        </li>
                        {!isAuthenticated &&
                        <li className="nav-item pull-xs-right">
                            <Link to="/login" className="nav-link" activeClassName="active">Log In</Link>
                        </li>
                        }
                        {isAuthenticated &&
                        <li className="nav-item pull-xs-right">
                            <button onClick={this.onClickLogOut.bind(this)} className="btn btn-primary">
                                Logout
                            </button>
                        </li>
                        }
                    </ul>
                </nav>
            </header>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logOut, push }, dispatch)
}
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)