import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol, RowPanel} from '../.'
import { Field, Control, Form, Errors, actions as formActions } from 'react-redux-form';
import  * as BS  from 'react-bootstrap';
import * as validations from '../../lib/validations'
import {LoadingAnimation} from '../index'
import * as lib from '../../lib/'

const RegistrationForm = (props) => {
    let error_message = ""
    if (props.error) {
        error_message = (
            <div className="alert alert-danger">
                {props.error}
            </div>
        )
    }
    return (
        <RowPanel title="Register">
            <Form model="form_register_user" onSubmit={values => props.obj.handleSubmit(values)}
             validators={{
                   '': {  passwordsMatch: validations.passwordsMatch }
             }}
            >

                {error_message}
                <Errors className="errors text-danger" model="form_register_user"
                    messages={{
                       passwordsMatch: "Passwords don't match"
                    }}
                />

                <div className="margin-top-20 margin-bottom-20">
                    <h4 className="text-info">Login Info</h4>
                    <hr/>
                </div>

                <BS.FormGroup>
                    <label>Name</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter your name"
                        model=".name"
                        validators={{
                            minLength: validations.minLength(2)
                        }}/>
                    <Errors
                        className="text-danger errors"
                        model=".name"
                        show="touched"
                        messages={{
                            minLength: "Invalid name"
                        }}/>
                </BS.FormGroup>

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
                             placeholder="Enter password"
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
                    <label>Confirm Password</label>
                    <Control type="password"
                             name="password_confirm"
                             className="form-control"
                             placeholder="Confirm password"
                             model=".password_confirm"
                             validators={{
                                 minLength: validations.minLength(6)
                             }}/>
                    <Errors
                        className="text-danger errors"
                        model=".password_confirm"
                        show="touched"
                        messages={{
                            minLength: "Invalid password"
                        }}/>
                </BS.FormGroup>

                <div className="margin-top-40 margin-bottom-20">
                    <h4 className="text-info">Application Info</h4>
                    <hr/>
                </div>

                <BS.FormGroup>
                    <label>Application Name</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter your application's name"
                        model=".app_name"
                        validators={{
                        }}/>
                    <Errors
                        className="text-danger errors"
                        model=".app_name"
                        show="touched"
                        messages={{
                        }}/>
                </BS.FormGroup>
                <BS.FormGroup>
                    <label>Application URL</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter your application's url"
                        model=".app_url"
                        validators={{
                        }}/>
                    <Errors
                        className="text-danger errors"
                        model=".app_url"
                        show="touched"
                        messages={{
                        }}/>
                </BS.FormGroup>

                <div className="margin-top-20 margin-bottom-20">
                    <small className="text-warning">By registering you agree with the Terms and Conditions</small>
                </div>

                <BS.FormGroup>
                    <button type="submit" className="btn btn-info btn-lg btn-block">
                       Register
                    </button>
                </BS.FormGroup>
            </Form>
        </RowPanel>
    )
}

class Register extends Component {

    handleSubmit = (values) =>
        this.props.dispatch(actions.registerUser(
            values.name,
            values.email,
            values.password,
            values.password_confirm,
            values.app_name,
            values.app_url));

    render = () => {
        const { register_user } = this.props
        switch(register_user.status) {
            case "success":
                lib.forwardToLocation("/account")
                break;
            case "error":
                return <RegistrationForm obj={this} error={register_user.error_message}/>
            case "pending":
                return <LoadingAnimation message="Saving your info..."/>
            default:
                return <RegistrationForm obj={this}/>
        }
    }
}

export default connect((store) => {
    return {
        register_user: store.register_user
    }
})(Register)
