import types from 'Actions/types';
import { initialModalState } from './initialState'

const { SHOW_MODAL, HIDE_MODAL } = types;

/**
 * @description This handles modals reducer
 * @param {object} [state] -redux state
 * @param { object } [action] - action creator
 * @returns {object} - new state
 */

const modal = (state = initialModalState, action = {}) => {
    switch (action.type) {
        case SHOW_MODAL:
            return Object.assign({}, state, {
                modalType: action.modalType
            });
            break;
        case HIDE_MODAL:
            return initialModalState;
            break;
        default:
            return state;
    }
}

export default modal