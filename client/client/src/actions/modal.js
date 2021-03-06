import types from 'Actions/types';

const {
    SHOW_MODAL,
    HIDE_MODAL
} = types;


/**
 * @description Action creators to show and hide modal
 * @param { object } - [modalType]
 * @returns { object } - Returns object creator
 */
export const loadModal = (modalType, payload) => {
    return {
        type: SHOW_MODAL,
        modalType,
        payload
    };
};
export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
};

export const showModal = (modalType, payload) => (
    dispatch => {
        dispatch(loadModal(modalType, payload));
    }
);
export const closeModal = () => (
    dispatch => {
        dispatch(hideModal())
    }
);