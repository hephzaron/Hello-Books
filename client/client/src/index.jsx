import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import axios from 'axios';
import addFlashMessage from 'Actions/flashMessage';
import { setCurrentUser, logoutUser } from 'Actions/userAuth';
import setAuthToken from 'Utils/setAuthToken';
import  Routes  from 'Routes';
import 'Public/css/bootstrap.min.css';
{/**import 'font-awesome/css/font-awesome.css'**/};
import 'Public/scss/home.scss';
import Main from 'HomePage/Landing/Main'


/**
 * @description Request interceptor
 */

axios.interceptors.request.use((response) => {
    store.dispatch(showLoading());
    return response
}, () => {
    store.dispatch(showLoading());
});

/**
 * @description response  interceptor
 */

axios.interceptors.response.use((response) => {
    store.dispatch(hideLoading());
    return response;
}, (error) => {
    store.dispatch(hideLoading());
    if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: error.response.data
        }));
        store.dispatch(logoutUser());
    }
    return Promise.reject(error);
});

if (localStorage.authToken) {
    setAuthToken(localStorage.authToken);
    store.dispatch(setCurrentUser(JSON.parse(localStorage.userPayload)));
}

/**
 * @description The entry point - this will render the application with it's 
 * route on the DOM
 * @returns {void}
 */

render( 
    <Provider store = { store } >
        <Main/>
    </Provider>,
    document.getElementById('app')
);