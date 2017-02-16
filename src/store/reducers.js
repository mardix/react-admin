import {CONST} from '../lib/'

const apiInitState = {
    data: {},
    status: null,
    loaded: false,
    error_message: null
}

const apiReducer =  (TYPE, state=apiInitState, action) => {

    switch(action.type) {
        case `${TYPE}_PENDING`:
            return {...state, status: "pending", data:{}, loaded: false, error_message: null}
            break;
        case `${TYPE}_FULFILLED`:
            if (action.payload.status == "error") {
                return {...state, status: "error", data:{}, loaded: false, error_message: action.payload.error_message}
            }
            return {...state, status: "success", data:action.payload.data, loaded: true, error_message: null}
            break;
        case `${TYPE}_REJECTED`:
            console.log("REJECTED")
            return {...state, status: "error", data:{}, loaded: false, error_message: "Something bad happened. Contact Admin"}
            break;
    }
    return state
}


export const fetchApiKeys = (state=apiInitState, action) =>
    apiReducer(CONST.FETCH_API_KEYS, state, action)

export const accountInfo = (state=apiInitState, action) =>
    apiReducer(CONST.ACCOUNT_INFO, state, action)

export const fetchDataCount = (state=apiInitState, action) =>
    apiReducer(CONST.FETCH_DATA_COUNT, state, action)

export const fetchDataPolicies = (state=apiInitState, action) =>
    apiReducer(CONST.FETCH_DATA_POLICIES, state, action)

export const fetchLatestPackageInfo = (state=apiInitState, action) =>
    apiReducer(CONST.FETCH_LATEST_PACKAGE_INFO, state, action)

export const login_user = (state=apiInitState, action) =>
    apiReducer(CONST.LOGIN_USER, state, action)

export const register_user = (state=apiInitState, action) =>
    apiReducer(CONST.REGISTER_USER, state, action)

export const lost_password = (state=apiInitState, action) =>
    apiReducer(CONST.LOST_PASSWORD, state, action)

export const logout_user = (state=apiInitState, action) =>
    apiReducer(CONST.LOGOUT_USER, state, action)

