import types from 'Actions/types';
import { initialCenterPageState } from './initialState'

const { SHOW_CENTER_PAGE, HIDE_CENTER_PAGE } = types;

/**
 * @description This handles center pages reducer
 * @param {object} [state] -redux state
 * @param { object } [action] - action creator
 * @returns {object} - new state
 */

const centerPage = (state = initialCenterPageState, action = {}) => {
    switch (action.type) {
        case SHOW_CENTER_PAGE:
            return Object.assign({}, state, {
                pageType: action.pageType
            });
            break;
        case HIDE_CENTER_PAGE:
            return initialCenterPageState;
            break;
        default:
            return state;
    }
}

export default centerPage