import types from 'Actions/types';

const { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } = types;

/**
 * @description This handles flash message reducers
 * @param {object} state - redux state
 * @param {object} action - action creator
 * @returns {object} new state
 */

const flashMessages = (state = {}, action) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return {
                type: action.message.type,
                text: action.message.text
            };
            break;
        case REMOVE_FLASH_MESSAGE:
            return {};
            break;
        default:
            return state;
    }
};

export default flashMessages;