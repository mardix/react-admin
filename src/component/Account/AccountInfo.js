import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol, RowPanel, ServiceView} from '../.'
import  * as BS  from 'react-bootstrap';
import { Field, Control, Form, Errors, LocalForm } from 'react-redux-form';
import { LoadingAnimation, ErrorBlock } from '../index'
import * as validations from '../../lib/validations'
import * as lib from '../../lib/'


const EditNameForm = (props) => {
    let error_message = ""
    if (props.error) {
        error_message = (
            <div className="alert alert-danger">
                {props.error}
            </div>
        )
    }
    return (
        <RowPanel title="Change Name">
            <LocalForm onSubmit={values => props.self.handleSubmit(values)}>
                <Control
                         type="hidden"
                         model=".action"
                         value="change-info"
                />
                <BS.FormGroup>
                    <label>Name</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter Name"
                        value={props.name}
                        model=".name"/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <button type="submit" className="pull-left btn-info btn btn-lg">
                        <i className="fa fa-check"></i> Save
                    </button>
                    <button type="button" onClick={props.self.handleCancelEdit} className="pull-right btn btn-link btn-lg">
                        <i className="fa fa-close text-danger"></i> Cancel
                    </button>
                </BS.FormGroup>
            </LocalForm>
        </RowPanel>
    )
}

const EditLoginForm = (props) => {
    let error_message = ""
    if (props.error) {
        error_message = (
            <div className="alert alert-danger">
                {props.error}
            </div>
        )
    }
    return (
        <RowPanel title="Change Login">
            <BS.Form  onSubmit={values => props.self.handleSubmit(values)}>
                <Control type="hidden"
                         model=".action"
                         value="change-login"
                />
                {error_message}

                <BS.FormGroup>
                    <label>Email</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter login email"
                        model=".email"/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <label>Password</label>
                    <Control type="password"
                             className="form-control"
                             placeholder="Confirm Changes by entering your password"
                             model=".password"/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <button type="submit" className="pull-left btn-info btn btn-lg">
                        <i className="fa fa-check"></i> Save
                    </button>
                    <button type="button" onClick={props.self.handleCancelEdit} className="pull-right btn btn-link btn-lg">
                        <i className="fa fa-close text-danger"></i> Cancel
                    </button>
                </BS.FormGroup>
            </BS.Form>
        </RowPanel>
    )
}

const EditPasswordForm = (props) => {
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
            <Form model="form_edit_accountx" onSubmit={values => props.self.handleSubmit(values)}>
                <Control type="hidden"
                         model=".action"
                         value="change-password"
                />
                {error_message}
                <BS.FormGroup>
                    <label>Email</label>
                    <Control.text
                        className="form-control"
                        placeholder="Enter login email"
                        model=".email"/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <label>Password</label>
                    <Control type="password"
                             className="form-control"
                             placeholder="Enter login password"
                             model=".password"/>
                </BS.FormGroup>

                <BS.FormGroup>
                    <button type="submit" className="pull-left btn-info btn btn-lg">
                        <i className="fa fa-check"></i> Save
                    </button>
                    <button type="button" onClick={props.self.handleCancelEdit} className="pull-right btn btn-link btn-lg">
                        <i className="fa fa-close text-danger"></i> Cancel
                    </button>
                </BS.FormGroup>
            </Form>
        </RowPanel>
    )
}

const AccountInfoView  = (props) =>
    <RowPanel title="My Account Info">
        <BS.Table responsive >
            <tbody>
            <tr>
                <td><strong>Name</strong>: {props.data.name}</td>
            </tr>
            <tr>
                <td><strong>Email</strong>: {props.data.email}</td>
            </tr>
            <tr>
                <td><strong>Country</strong>: {props.data.country}</td>
            </tr>
            </tbody>
        </BS.Table>

        <BS.FormGroup>
            <button type="button" onClick={props.self.handleEditName}  className="btn btn-link btn-md">
                Change Name
            </button>
            <button type="button" onClick={props.self.handleEditLogin} className="btn btn-link btn-md">
                Change Login
            </button>
            <button type="button" onClick={props.self.handleEditPassword} className="btn btn-link btn-md">
                Change Password
            </button>

        </BS.FormGroup>
    </RowPanel>


class AccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: null
        };
    }

    showView = (view) =>
        this.setState({"view": view})

    handleCancelEdit = () =>
        this.showView("info")

    handleEditName = () =>
        this.showView("edit-name")

    handleEditLogin = () =>
        this.showView("edit-login")

    handleEditPassword = () =>
        this.showView("edit-password")

    handleSubmit = (values) => {
        console.log(values)
        console.log("Subnmite")
    }


    componentWillMount = () => {
        if (! this.props.account_info.loaded) {
            this.getData();
        }
    }

    getData = () =>
        this.props.dispatch(actions.accountInfo())


    render = () => {
        let account_info = this.props.account_info

        if (account_info.status === "success") {
            switch(this.state.view) {
                case "edit-name":
                    return <EditNameForm self={this} name={account_info.data.name} />
                case "edit-login":
                    return <EditLoginForm self={this} email={account_info.data.email} />
                case "edit-password":
                    return <EditLoginForm self={this} />
                default:
                    return <AccountInfoView self={this} {...account_info} />
            }
        }
        return (account_info.status === "error")
            ? <ErrorBlock error={account_info.error_message}/>
            : <LoadingAnimation/>

    }


}

export default connect((store) => {
    return {
        account_info: store.account_info
    }
})(AccountInfo)


