

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import { combineForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import * as reducers from './reducers'
import * as actions from './actions'

const middleware =  applyMiddleware(promise(), thunk)

export default createStore(combineForms({
    routing: routerReducer,
    api_keys: reducers.fetchApiKeys,
    account_info: reducers.accountInfo,
    data_count: reducers.fetchDataCount,
    data_policies: reducers.fetchDataPolicies,
    latest_package_info: reducers.fetchLatestPackageInfo,


    /* USER LOGIN */
    login_user: reducers.login_user,
    logout_user: reducers.logout_user,
    register_user: reducers.register_user,
    lost_password: reducers.lost_password,


    /* FORM */
    form_login_user: {
        email: '',
        password: ''
    },
    form_register_user: {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        app_name: '',
        app_url: ''
    },
    form_lost_password: {
        email: ''
    },
    form_edit_account: {
        action: '',
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        current_password: ''
    }

}), middleware);


export {actions};


