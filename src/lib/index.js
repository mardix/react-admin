
import { browserHistory } from 'react-router';
import * as api from './api'
import CONST from './constants'

/**
 * Transform an object to a form data to be used in AJAX form
 * @param object
 * @returns {*}
 */

export const getJWTToken = () =>
    localStorage.getItem("token")

export const setJWTToken = (token, ttl) =>
    localStorage.setItem("token", token)

export const delJWTToken = () =>
    localStorage.removeItem("token")

export const forwardToLocation = (location) =>
    browserHistory.push(location)

export { api, CONST }