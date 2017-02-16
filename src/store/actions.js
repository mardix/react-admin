
import * as lib from '../lib/'
import store from './'

export function fetchApiKeys() {
    return {
        type: lib.CONST.FETCH_API_KEYS,
        payload: lib.api.get(lib.CONST.FETCH_API_KEYS_ENDPOINT)
    }
}

export function updateApiKey(id, name, url) {
    return {
        type: lib.CONST.UPDATE_API_KEYS,
        payload: lib.api.submitForm(lib.CONST.UPDATE_API_KEYS,
            {id: id, name: name, url: url})
            .then(resp => {
                if (resp.status === "success") {
                    store.dispatch(fetchApiKeys())
                }
            })
    }
}

export function accountInfo(data=null) {

    if (data === null) {
        return {
            type: lib.CONST.ACCOUNT_INFO,
            payload: lib.api.get(lib.CONST.ACCOUNT_INFO_ENDPOINT)
        }
    } else {
        return {
            type: lib.CONST.ACCOUNT_INFO,
            payload: lib.api.submitForm(lib.CONST.ACCOUNT_INFO_ENDPOINT, data)
                .then(resp => {
                    store.dispatch(accountInfo())
                    return resp
                })
        }
    }
}


export function fetchDataCount() {
    return {
        type: lib.CONST.FETCH_DATA_COUNT,
        payload: lib.api.get(lib.CONST.FETCH_DATA_COUNT_ENDPOINT)
    }
}

export function fetchDataPolicies() {
    return {
        type: lib.CONST.FETCH_DATA_POLICIES,
        payload: lib.api.get(lib.CONST.FETCH_DATA_POLICIES_ENDPOINT)
    }
}

export function fetchLatestPackageInfo() {
    return {
        type: lib.CONST.FETCH_LATEST_PACKAGE_INFO,
        payload: lib.api.get(lib.CONST.FETCH_LATEST_PACKAGE_INFO_ENDPOINT)
    }
}


/* AUTH */

export const loginUser = (email, password) => {
    return {
        type: lib.CONST.LOGIN_USER,
        payload: lib.api.submitForm(lib.CONST.LOGIN_USER_ENDPOINT,
            {email: email, password: password})
            .then(resp => {
                if (resp.status == "success") {
                    lib.setJWTToken(resp.data.token)
                } else {
                    lib.delJWTToken()
                }
                return resp
            })
    }
}

export const lostPassword = (email) => {
    return {
        type: lib.CONST.LOST_PASSWORD,
        payload: lib.api.submitForm(lib.CONST.LOST_PASSWORD_ENDPOINT, {email: email})
    }
}

export const logoutUser = () => {
    return {
        type: lib.CONST.LOGOUT_USER,
        payload: new Promise((resolve, reject) => {
            lib.delJWTToken()
            resolve({})
        })
    }
}

export const registerUser = (name, email, password, password_confirm, appName=null, appUrl=null) => {
    console.log( {name: name, email: email, password: password,
        password_confirm: password_confirm, app_name: appName,
        app_url: appUrl})
    return {
        type: lib.CONST.REGISTER_USER,
        payload: lib.api.submitForm(lib.CONST.REGISTER_USER_ENDPOINT,
            {name: name, email: email, password: password,
                password_confirm: password_confirm, app_name: appName,
                app_url: appUrl})
            .then(resp => {
                if (resp.status == "success") {
                    return store.dispatch(loginUser(email, password)).then(resp1 => {
                        if (resp1.status === "success") {
                            store.dispatch(fetchApiKeys())
                        }
                        return resp1
                    })
                }
                return resp
            })
    }
}





