import axios from 'axios';

/**
 * @description This sets the authorization token in the headers
 * and content type on every request
 * @param {string} AUTH_TOKEN
 * @returns {void}
 */

const setAuthToken = (AUTH_TOKEN) => {

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    if (AUTH_TOKEN) {
        axios.defaults.headers.common['X-Access-Token'] = AUTH_TOKEN;
    } else {
        delete axios.defaults.headers.common['X-Access-Token'];
    }

};

export default setAuthToken;