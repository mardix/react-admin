import CONST from './constants'
import {getJWTToken} from './'

export const objectToFormData = (object) => {
    const form = new FormData()
    for (let key in object) {
        form.append(key, object[key])
    }
    return form
}


const apiCall = (endpoint, method="GET", body=null) => {

    const url = `${CONST.SERVICE_URL}/${endpoint}/?origin=${CONST.SERVICE_URL_ORIGIN}`
    const token = getJWTToken()
    const headers = {
        'Accept': 'application/json'
    }
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    return fetch(url, {
            headers: headers,
            method: method,
            body: body
        })
        .then(response => {

            console.log(response.ok)

            if (response.headers.get('content-length') === '0' || response.status === 204) {
                return Promise.reject("No content")
            }
            if (response) {
                return response.json()
            } else {
                return null;
            }

        })
        .catch(error => {
            throw error;
        })
};

export const get = (endpoint, body=null) =>
    apiCall(endpoint, "GET", body);

export const post = (endpoint, body=null) =>
    apiCall(endpoint, "POST", body);

export const submitForm = (endpoint, data={}) =>
    post(endpoint, objectToFormData(data))




