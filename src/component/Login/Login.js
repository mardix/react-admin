import store, { actions } from '../../store'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RowPanel } from '../.'
import { Field, Control, Form, Errors } from 'react-redux-form';
import { LoadingAnimation } from '../index'
import * as BS  from 'react-bootstrap';
import * as validations from '../../lib/validations'
import * as lib from '../../lib/'

const LoginForm = (props) => {
    let error_message = ""
    if (props.error) {
        error_message = (
            <div className="alert alert-danger">
                {props.error}
            </div>
        )
    }
    return (
    <RowPanel title="Login">
        <Form model="form_login_user" onSubmit={values => props.self.handleSubmit(values)}>
            {error_message}
            <BS.FormGroup>
                <label>Email</label>
                <Control.text
                    className="form-control"
                    placeholder="Enter login email"
                    model=".email"
                    validators={{
                        validEmail: validations.validEmail,
                    }}/>
                <Errors
                    className="text-danger errors"
                    model=".email"
                    show="touched"
                    messages={{
                        validEmail: 'Invalid email address'
                    }}/>
            </BS.FormGroup>

            <BS.FormGroup>
                <label>Password</label>
                <Control type="password"
                         className="form-control"
                         placeholder="Enter login password"
                         model=".password"
                         validators={{
                             minLength: validations.minLength(6)
                         }}/>
                <Errors
                    className="text-danger errors"
                    model=".password"
                    show="touched"
                    messages={{
                        minLength: "Invalid password"
                    }}/>
            </BS.FormGroup>

            <BS.FormGroup>
                <button type="submit" className="btn btn-info btn-lg btn-block">
                    Login
                </button>
            </BS.FormGroup>
        </Form>
    </RowPanel>
    )
}

class Login extends Component {

    handleSubmit = (values) =>
        this.props.dispatch(actions.loginUser(values.email, values.password));

    render = () => {
        const { login_user } = this.props
        switch(login_user.status) {
            case "success":
                lib.forwardToLocation("/account/")
                break;
            case "error":
                return <LoginForm self={this} error={login_user.error_message}/>
            case "pending":
                return <LoadingAnimation message="Signing you in..."/>
            default:
                return <LoginForm self={this}/>
        }
    }
}

export default connect((store) => {
    return {
        login_user: store.login_user
    }
})(Login)
