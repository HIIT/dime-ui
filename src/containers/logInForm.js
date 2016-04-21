import React from 'react';
import { Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import store from 'store'

import { logIn } from '../actions/index'

export default class LogInForm extends Component {
    componentWillMount(){
        const username = store.get('username')
        const password = store.get('password')
        if (username != null && password != null) {
            this.props.push('/')
        }
    }
    onSubmit(formProps) {
        store.remove('username')
        store.remove('password')
        this.props.logIn(formProps)
        this.props.push('/')
    }
    render() {
        let { fields: {username, password, port, remember}, handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Login to your Digital Work Me account.</h3>
                <div className={`form-group row ${username.touched && username.invalid ? 'has-danger' : ''}`}>
                    <label className="col-sm-2 form-control-label">Username</label>
                    <div className="col-sm-3">
                        <input type="text"
                               className="form-control"
                               placeholder="Enter username"
                               {...username}
                        />
                        <small className="text-help">
                            {username.touched ? username.error: ''}
                        </small>
                    </div>
                </div>
                <div className={`form-group row ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                    <label className="col-sm-2 form-control-label">Password</label>
                    <div className="col-sm-3">
                        <input type="password"
                               className="form-control"
                               placeholder="Password"
                               {...password}
                        />
                        <small className="text-help">
                            {password.touched ? password.error: ''}
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-offset-2 col-sm-10">
                        <label className="c-input c-checkbox">
                            <input type="checkbox" {...remember} />
                            <span className="c-indicator" />
                            Remember
                        </label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit"
                                className="btn btn-primary" >
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {}
    if (!values.username) {
        errors.username = 'Enter a username'
    }
    if (!values.password) {
        errors.password = 'Enter password'
    }
    return errors
}
//connect: first argument is mapStateToProps, 2nd is mapDispatch
//reduxForm 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatch
export default reduxForm({
    form: 'LogInForm',
    fields: ['username', 'password', 'remember'],
    validate
},
state => ({
    initialValues: {
        username: 'chh',
        password: 12345,
        remember: true
    }
}), { logIn, push })(LogInForm)
