import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { RowPanel } from '../.'
import { Field, Control, Form, Errors, actions as formActions } from 'react-redux-form';
import * as BS  from 'react-bootstrap';
import * as validations from '../../lib/validations'
import {LoadingAnimation} from '../index'
import * as lib from '../../lib/'


const LostPasswordForm = (props) => {
    let message = ""

    if (props.error) {
        message = (
            <div className="alert alert-danger">
                {props.error}
            </div>
        )
    }  else if (props.success) {
        message = (
            <div className="alert alert-success">
                {props.success}
            </div>
        )        
    }    
    return (
        <RowPanel title="Lost Password">
            <Form model="form_lost_password" onSubmit={values => props.obj.handleSubmit(values)}>
                {message}
                <BS.FormGroup>
                    <label>Email</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter login email"
                        model=".email"
                        validators={{
                            validEmail: validations.validEmail
                        }}/>
                    <Errors
                        className="text-danger errors"
                        model=".email"
                        show="touched"
                        messages={{
                            required: 'Required ',
                            validEmail: 'Invalid email address'
                        }}/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <button type="submit" className="btn btn-info btn-lg btn-block">
                        Send Password
                    </button>
                </BS.FormGroup>
            </Form>
        </RowPanel>
    )
}

class LostPassword extends Component {
    
    handleSubmit = (values) =>
        this.props.dispatch(actions.lostPassword(values.email))

    render = () => {
        const { lost_password } = this.props
        switch(lost_password.status) {
            case "success":
                return <LostPasswordForm obj={this} success={lost_password.data.message}/>
                break;
            case "error":
                return <LostPasswordForm obj={this} error={lost_password.error_message}/>
            case "pending":
                return <LoadingAnimation message="Retrieving your password..."/>
            default:
                return <LostPasswordForm obj={this}/>
        }
    }
    

}

export default connect((store) => {
    return {
        lost_password: store.lost_password
    }
})(LostPassword)
