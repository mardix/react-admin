
import store, {actions} from '../../store'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ViewServiceData, RowCol, RowPanel} from '../.'
import  * as BS  from 'react-bootstrap';


class Download extends ViewServiceData {

    dataKey = "latest_package_info"
    dataAction = "fetchLatestPackageInfo"

    downloadPackage = () => {
        const url = this.props.latest_package_info.data.download_url
        window.open(url)
        console.log(url)
    }

    view = (data) =>
        <RowPanel title="Product">
            <BS.Table responsive>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><strong>{data.name}</strong></td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td><strong>{data.version}</strong></td>
                    </tr>
                    <tr>
                        <td>Release Date</td>
                        <td><strong>{data.date}</strong></td>
                    </tr>

                </tbody>
            </BS.Table>
            <button href="#" onClick={this.downloadPackage} className="btn btn-info btn-lg btn-block">Download <i className="fa fa-arrow-down"></i></button>
        </RowPanel>
}

export default connect((store) => {
    return {
        latest_package_info: store.latest_package_info
    }
})(Download)

