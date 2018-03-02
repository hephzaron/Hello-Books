import types from 'Actions/types';
import { initialBookState } from './initialState';

const {
    SET_BOOKS,
    ADD_BOOK,
    BOOK_DELETED,
    BOOK_EDITED,
    BOOKS_SEARCHED
} = types;

const books = (state = initialBookState, action = {}) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: action.books
            };
            break;
        case ADD_BOOK:
            return {
                ...state,
                books: [
                    ...state.books, action.book
                ]
            };
            break;
        case BOOK_DELETED:
            const bookAfterDeletion = state.books.filter(
                book => book.id !== action.bookId
            )
            return {
                ...state,
                books: bookAfterDeletion
            };
            break;
        case BOOK_EDITED:
            const bookAfterEditing = state.books.map((book) => {
                book.id === action.book.id ? action.book :
                    book
            })
            return {
                ...state,
                books: bookAfterEditing
            };
            break;
        case BOOKS_SEARCHED:
            return {
                ...state,
                books: action.result
            };
            break;
        default:
            return state

    }
}