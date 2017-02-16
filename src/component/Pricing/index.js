
import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol} from '../.'
import  * as BS  from 'react-bootstrap';

const PlanPanel = (props) =>
    <BS.Col md={4} className="text-center">
        <div className="pricing-plan wow zoomIn animated">
            <h4>{props.name}</h4>
            <div className="pricing_circle">
                <h5><span>$</span>
                    <br />
                    <span className="pricing-amount">{ props.price }</span>
                    <br />
                    <span>Year</span>
                </h5>
            </div>
            <BS.Table responsive >
                <tbody>
                {props.features.map(i =>
                    <tr><td>{i}</td></tr>
                )}
                </tbody>
            </BS.Table>
            <a href="#">Sign Up</a>
        </div>
    </BS.Col>


class Pricing extends ViewServiceData {
    dataKey = "data_policies"
    dataAction = "fetchDataPolicies"

    view = (data) => {
        let result  = data.map(i => {
            if (!i.hidden) {
                return <PlanPanel {...i}/>
            }
        })
        return <RowCol>{result}</RowCol>
    }

}

export default connect((store) => {
    return {
        data_policies: store.data_policies
    }
})(Pricing)
