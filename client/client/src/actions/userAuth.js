import axios from 'axios';
import setAuthToken from 'Utils/setAuthToken';
import { addFlashMessage } from './flashMessage';
import types from './types';

const { SET_CURRENT_USER } = types;

/**
 * @description This creates action for settiing current user
 * @param {object} user object
 * @returns {object} action creator
 */

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

export const logoutUser = () => (
    (dispatch) => {
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
)

export const loginUser = (userData) => (
    (dispatch) => {
        const { token, ...rest } = userData;
        const userPayload = {...rest }
        localStorage.setItem('x-access-token', token);
        localStorage.setItem('userPayload', userPayload);
        setAuthToken(token);
        dispatch(setCurrentUser(userPayload));
    }
)

/**
 * @description send request to server to login user
 * @param {object} payload
 * @returns {object} It returns axios success response object or error object on error
 */

export const signin = (userData) => (
    (dispatch) => (
        axios
        .post('http://localhost:5432/api/v1/users/signin', userData)
        .then((response) => {
            dispatch(loginUser(response.data.user));
            return response
        })
        .catch(
            errors => {
                dispatch(addFlashMessage({
                    type: 'error',
                    text: errors.response.data.message
                }));
                return errors;
            }
        )
    )
)

/**
 * @description sends reset password mail
 * @param {object} payload
 * @returns {promise} axios promise
 */

export const sendResetPasswordMail = (payload) => (
    (dispatch) => axios
    .post('http://localhost:5432/api/v1/users/reset-password', payload)
    .then((response) => {
        dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
        }));
    })
    .catch((errors) => {
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    })
)

/**
 * @description This resets user's password
 * @param {object} payload
 * @returns {promise} Axios promise object
 */

export const resetPassword = (payload) => (
    (dispatch) =>
    axios
    .post('http://localhost:5432/api/v1/users/reset-password/verify', payload)
    .then((response) => {
        dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
        }));
    })
    .catch((errors) => {
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    })

)

export const changePassword = (payload) => (
    dispatch =>
    axios.put('http://localhost:5432/api/v1/users/change_password', payload)
    .then((response) => {
        dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
        }));
        dispatch(logoutUser());
    })
    .catch((errors) => {
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    })
)