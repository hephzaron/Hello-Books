import types from 'Actions/types';
import { initialPaginationState } from './initialState';

const { SET_PAGE, PAGE_FETCHED, SET_PAGER } = types;

const pagination = (state = initialPaginationState, action = {}) => {
    switch (action.type) {
        case SET_PAGER:
            return {...state,
                ['pager']: action.pager
            };
            break;
        default:
            return state
    }
}

export default pagination;