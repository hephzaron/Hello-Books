import types from 'Actions/types';

const { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } = types;

/**
 * @description creates action to add flash messages
 * @param {object} message payload
 * @returns {object} this returns action creator
 */

export const addFlashMessage = (message) => ({
    type: ADD_FLASH_MESSAGE,
    message
})

export const removeFlashMessage = () => ({
    type: REMOVE_FLASH_MESSAGE
})