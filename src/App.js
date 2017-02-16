import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import * as Account from './component/Account/'
import * as Login from './component/Login/'
import Pricing from './component/Pricing/'

import './assets/spa.css';

const history = syncHistoryWithStore(browserHistory, store)

const isLoggedIn = (nextState, replace, callback) => {
    new Promise((resolve, reject) => {
        console.log("IS LOGGED IN")
        callback()
    })
}

export default class App extends Component {
    render = () =>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/account' component={Account.Layout} onEnter={isLoggedIn}>
                    <IndexRoute component={Account.Home} />
                    <Route path="api-keys" component={Account.ApiKeys} />
                    <Route path="upgrade" component={Pricing} />
                    <Route path="products" component={Account.Products} />
                    <Route path="my-account" component={Account.AccountInfo} />
                </Route>
                <Route path="/account" component={Login.Layout}>
                    <Route path="login" component={Login.Login} />
                    <Route path="register" component={Login.Register} />
                    <Route path="lost-password" component={Login.LostPassword} />
                    <Redirect from="logout" to="login" />
                </Route>
            </Router>
        </Provider>

}

