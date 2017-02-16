import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol, RowPanel} from '../.'
import  * as BS  from 'react-bootstrap';


class Home extends ViewServiceData {

    dataKey = "account_info"
    dataAction = "fetchAccountInfo"

    view = (data) =>
        <RowPanel>
            <h2 className="text-center margin-bottom-40 margin-top-40">Hello {data.name}</h2>
        </RowPanel>

}

export default connect((store) => {
    return {
        account_info: store.account_info
    }
})(Home)

