
import React, {Component} from 'react';
import {actions} from '../store'
import  * as BS  from 'react-bootstrap';

export const LoadingAnimation = (props) =>
    <div className="margin-top-40">
        <div className="loading-animation"></div>
        <h2 className="text-center margin-top-40">{props.message || 'Loading...'}</h2>
    </div>


export const ErrorBlock = (props) =>
    <div className="alert alert-danger">{props.error}</div>


export const ServiceView = (props) => {
    if (props.status === "success") {
        console.log(props.data)
        return props.view(props.data)
    }
    return (props.status === "error")
        ? <ErrorBlock error={props.error_message}/>
        : <LoadingAnimation/>
}


/**
 * Build component data from service.
 * By extending it to your component it allows
 * the service to automatically pull the data and populate
 * it in the redux store.
 *
 * In your component: dataKey, dataAction and view() are required
 *
 */
export class ViewServiceData extends Component {
    dataKey = null
    dataAction = null

    /**
     * To pull the data when coming into the component
     */
    componentWillMount = () => {
        if (! this.props[this.dataKey].loaded) {
            this.getData();
        }
    }

    /**
     * Get the data into the store
     */
    getData = () =>
        this.props.dispatch(actions[this.dataAction]())

    /**
     * The view to render
     * @param data, the service data it receives from the store
     */
    view = (data) =>
        null

    render = () =>
        <ServiceView view={this.view} {...this.props[this.dataKey]} />
}

export const RowCol = (props) =>
    <BS.Row><BS.Col>{props.children}</BS.Col></BS.Row>


export const RowPanel = (props) =>
    <BS.Row>
        <BS.Col md={8} mdPush={2}>
            <div className="margin-top-20"></div>
            <BS.Panel header={props.title}>
                {props.children}
            </BS.Panel>
        </BS.Col>
    </BS.Row>
