import types from 'Actions/types';

const {
    SHOW_CENTER_PAGE,
    HIDE_CENTER_PAGE
} = types;


/**
 * @description Action creators to show and hide center page
 * @param { object } - [pageType]
 * @returns { object } - Returns object creator
 */
export const loadPage = (pageType) => {
    return {
        type: SHOW_CENTER_PAGE,
        pageType: pageType
    };
};
export const hidePage = () => {
    return {
        type: HIDE_CENTER_PAGE
    }
};

export const showPage = pageType => (
    dispatch => {
        dispatch(loadPage(pageType));
    }
);
export const closePage = () => (
    dispatch => {
        dispatch(hidePage())
    }
);