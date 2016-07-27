import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { IndexLink } from 'react-router'
import { browserHistory } from 'react-router'

import { logOut } from '../actions'
import NavLink from '../components/navLink'

class NavBar extends Component {
    onClickLogOut() {
        this.props.logOut()
        browserHistory.push('/login')
    }
    render() {
        const { isAuthenticated } = this.props
        return (
            <header className="navbar navbar-fixed-top navbar-dark bg-inverse hidden-sm-down" role="banner">
                <nav className="nav navbar-nav">
                    <IndexLink to="/" className="navbar-brand" activeClassName="active">DiMe</IndexLink>
                    <ul className="nav navbar-nav clearfix">
                        {isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                        }
                        {isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink to="/documents">Documents</NavLink>
                            </li>
                        }
                        {isAuthenticated &&
                        <li className='nav-item'>
                            <NavLink to="/dashboard">DashBoard</NavLink>
                        </li>
                        }
                        {!isAuthenticated &&
                            <li className="nav-item pull-xs-right">
                                <NavLink to="/login">Log In</NavLink>
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
    return bindActionCreators({ logOut }, dispatch)
}
function mapStateToProps(state) {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated,
    };
}
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(NavBar)
// { pure: false } is a workaround for active class see => https://github.com/react-bootstrap/react-router-bootstrap/issues/152
