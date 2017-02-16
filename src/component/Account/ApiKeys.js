
import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol, RowPanel} from '../.'
import  * as BS  from 'react-bootstrap';



const APIKeyItem = (props) =>
    <RowPanel title={props.application_name}>
        <BS.Table responsive >
            <tbody>
                <tr>
                    <td><strong>Name</strong>: {props.application_name}</td>
                </tr>
                <tr>
                    <td><strong>URL</strong>: {props.application_url}</td>
                </tr>
                <tr>
                    <td><strong>API Key</strong>: {props.api_key}</td>
                </tr>
                <tr>
                    <td><strong>Public Key</strong>: {props.public_key}</td>
                </tr>
            </tbody>
        </BS.Table>
    </RowPanel>


class AccountAPIKeys extends ViewServiceData {

    dataKey = "api_keys"
    dataAction = "fetchApiKeys"

    view = (data) => {
        let result = data.map(i => <APIKeyItem {...i}/>)
        return <RowCol>{result}</RowCol>
    }
}
export default connect((store) => {
    return {
        api_keys: store.api_keys
    }
})(AccountAPIKeys)

