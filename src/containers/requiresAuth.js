//learn from http://engineering.blogfoster.com/higher-order-components-theory-and-practice/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

export default function requiresAuth(Component) {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            auth: PropTypes.object,
            dispatch: PropTypes.func.isRequired
        };
        componentDidMount() {
            this.checkAndRedirect();
        }
        componentDidUpdate() {
            this.checkAndRedirect();
        }
        checkAndRedirect() {
            const { dispatch } = this.props;
            if (typeof this.props.auth.username === 'undefined' || typeof this.props.auth.password === 'undefined') {
                browserHistory.push('/login')
            }
        }
        render() {
            return (
                <div className="authenticated">
                    { (typeof this.props.auth.username !== 'undefined' &&  typeof this.props.auth.password !== 'undefined') ? <Component {...this.props} /> : null }
                </div>
            );
        }
    }
    const mapStateToProps = (state) => {
        return {
            auth: state.auth
        };
    };
    return connect(mapStateToProps)(AuthenticatedComponent);
}
