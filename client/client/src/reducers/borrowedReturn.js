import types from 'Actions/types';
import { initialBorrowedReturnState } from './initialState';

const {
    BOOK_BORROWED,
    BORROWED_FETCHED,
    SET_BORROWED_BOOKS,
    BORROWED_RETURNED
} = types;

const borrowedReturn = (state = initialBorrowedReturnState, action = {}) => {
    switch (action.type) {
        case BOOK_BORROWED:
            return {
                ...state,
                borrowedBooks: [
                    ...state.borrowedBooks, action.borrowedBook
                ]
            };
            break;
        case BORROWED_FETCHED:
            return action.borrowedBooks;
            break;
        case SET_BORROWED_BOOKS:
            return {
                ...state,
                userBooks: action.userBooks
            };
            break;
        case BORROWED_RETURNED:
            return {
                ...state,
                returnedBooks: [
                    ...state.returnedBooks, action.returnedBook
                ]
            }
            break;
        default:
            return state;
    }
}
export default borrowedReturn;