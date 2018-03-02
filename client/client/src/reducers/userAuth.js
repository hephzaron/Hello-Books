import { isEmpty } from 'lodash';
import types from 'Actions/types';
import { initialAuthState } from './initialState';

const { SET_CURRENT_USER } = types;

/**
 * @description This handles user authentication
 * @param {object} state - redux state
 * @param {object} action - creates action
 * 
 * @returns {object} new state
 */

const auth = (state = initialAuthState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
            break;
        default:
            return state;
    }
};

export default auth;