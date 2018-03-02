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

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

const logoutUser = () => (
    (dispatch) => {
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
)

const loginUser = (userData) => (
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

const signin = (userData) => (
    (dispatch) => (
        axios
        .post('/users/signin', userData)
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

const sendResetPasswordMail = (payload) => (
    (dispatch) => axios
    .post('/users/reset-password', payload)
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

const resetPassword = (payload) => (
    (dispatch) =>
    axios
    .post('/users/reset-password/verify', payload)
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

export { setCurrentUser, logoutUser, loginUser, signin, sendResetPasswordMail, resetPassword };