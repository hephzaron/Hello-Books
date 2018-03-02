import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessage';

const {
    BOOK_BORROWED,
    BORROWED_FETCHED,
    SET_BORROWED_BOOKS,
    BORROWED_RETURNED
} = types;

/**
 * Book borrowed
 * @description Sets borrowed in the store
 * @param {object} borrowedBook - Payload of borrowed book
 * @return {object} action Creator
 */
export const bookBorrowed = (borrowedBook) => ({
    type: BOOK_BORROWED,
    borrowedBook
})

/**
 * Borrowed fetched
 * @description Sets users borrowed books in the store
 * @param {object} borrowedBook - Payload of user borrowed books
 * @return {object} action Creator
 */

export const borrowedFetched = (borrowedBooks) => ({
    type: BORROWED_FETCHED,
    ...borrowedBooks
})

/**
 * Set borrowed books
 * @description Sets all borrowed books in the store
 * @param {array} userBooks - Payload of all borrowed books
 * @return {object} action Creator
 */
export const setBorrowedBooks = (userBooks) => ({
    type: SET_BORROWED_BOOKS,
    ...userBooks
})

/**
 * Borrowed returned
 * @description Updates user returned borrowed books in the store
 * @param {object} returnedBook - Payload of user borrowed books
 * @return {object} action Creator
 */
export const borrowedReturned = (returnedBook) => ({
    type: BORROWED_RETURNED,
    returnedBook
})

/**
 * Borrow book
 * @description Makes network request to borrow a book
 * @param {object} userId - Id of user 
 * @param {object} bookId - Id of book
 * @return {object} action Creator
 */
export const borrowBook = ({ userId, bookId }) => (
    dispatch => (
        axios.post(`/users/${userId}/books/${bookId}`, {})
        .then(response => {
            const {
                borrowedBook,
                message
            } = response.data
            dispatch(bookBorrowed(borrowedBook))
            dispatch(addFlashMessage({
                type: 'success',
                text: message
            }));
            return response;
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors;
        });
    );
);

/**
 * Fetch borrowed book
 * @description Makes network request to fetch books yet to be returned by user
 * @param {object} userId - Id of user 
 * @return {object} action Creator
 */
export const fetchBorrowedBook = ({ userId }) => (
    dispatch => (
        axios.get(`/users/${userId}/books`)
        .then(response => {
            dispatch(borrowedFetched(response.data.borrowedBooks));
            return response;
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            dispatch(borrowedFetched({}));
            return errors;
        });
    );
);

/**
 * Get all borrowed book
 * @description Makes network request to get all borrowed books
 * @param {void} null
 * @return {object} action Creator
 */

export const getAllBorrowedBooks = () => (
    dispatch => (
        axios.get('/books/users')
        .then(response => {
            dispatch(borrowedFetched(response.data.userBooks));
            return response;
        })
        .catch(errors => {
            dispatch(borrowedFetched({}));
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors;
        });
    );
)

/**
 * Return book
 * @description Makes network return a borrowed book
 * @param {object} userId - Id of user 
 * @param {object} bookId - Id of book
 * @return {object} action Creator
 */
export const returnBook = ({ userId, bookId }) => (
    dispatch => (
        axios.put(`/users/${userId}/books/${bookId}`, { returned: true })
        .then(response => {
            const {
                message,
                returnedBook
            } = response.data;
            dispatch(borrowedReturned(returnedBook));
            dispatch(addFlashMessage({
                type: 'success',
                text: message
            }));
            return response;
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors
        });
    );
);