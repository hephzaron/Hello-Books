import axios from 'axios';
import types from 'Actions/types';
import { addFlashMessage } from './flashMessage';

const {
    SET_AUTHORS,
    AUTHOR_FETCHED,
    ADD_AUTHOR,
    AUTHOR_EDITED,
    AUTHOR_DELETED,
    AUTHOR_ASSIGNED
} = types

/**
 * Set authors
 * @description  Sets fetched authors to the store
 * @param {array} authors - Payload of fetched authors
 * @returns {object} action creator
 */

export const setAuthors = (authors) => ({
    type: SET_AUTHORS,
    ...authors
});

/**
 * Fetch author
 * @description  Sets a fetched author to the store
 * @param {array} authors - Payload of fetched authors
 * @returns {object} action creator
 */

export const authorFetched = (author) => ({
    type: AUTHOR_FETCHED,
    author
});

/**
 * Add author
 * @description Adds a new author to the store
 * @param {object} author- Payload of single author to be added to the store
 * @returns {object} action creator
 */

export const addAuthor = (author) => ({
    type: ADD_AUTHOR,
    author
});

/**
 * Author edited
 * @description Sets edited author in the store
 * @param {object} author - Payload of edited author
 * @returns {object} action creator
 */
export const authorEdited = (author) => ({
    type: AUTHOR_EDITED,
    author
});

/**
 * Author assigned
 * @description Sets assigned author/book in the store
 * @param {object} authorBook - Payload of assigned author/book
 * @returns {object} action creator
 */

export const authorAssigned = (authorBook) => ({
    type: AUTHOR_ASSIGNED,
    authorBook
});

/**
 * Author deleted
 * @description Removes deleted author from store
 * @param {number} id  - deleted author id
 * @returns  {object} action creator
 */
export const authorDeleted = (authorId) => ({
    type: AUTHOR_DELETED,
    authorId
});

/**
 * Get authors
 * @description Gets authors from server
 * @param {void} null - no parameter
 * @returns {promise} Axios http response
 */

export const getAuthors = () => (
    dispatch => (
        axios.get('/authors')
        .then(response => {
            dispatch(setAuthors(response.data.authors));
            return response;
        })
        .catch(errors => {
            dispatch(setAuthors([]));
            dispatch(addFlashMessage({
                type: 'error',
                text: 'errors.response.data.message-author'
            }));
            return errors;
        })
    )
)

/**
 * Fetch author
 * @description Gets an author from server
 * @param {number} id - Unique id of author
 * @returns {promise} Axios http response
 */

export const fetchAuthor = (id) => (
    dispatch => (
        axios.get(`/authors/${id}`)
        .then(response => {
            dispatch(authorFetched(response.data.author));
            return response;
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors;
        })
    )
)

/**
 * Create author
 * @description Makes network request to create an author
 * @param {object} authorDetails - Details of author to be added to library
 * @returns {promise} Axios http response
 */

export const createAuthor = (authorDetails) => (
    dispatch => (
        axios.post('/authors', authorDetails)
        .then(response => {
            const {
                message,
                author
            } = response.data
            dispatch(addAuthor(author));
            dispatch(addFlashMessage({
                type: 'success',
                text: message
            }));
            return response
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors
        })
    )
);


/**
 * Edit author
 * @description Makes network request to create an author
 * @param {object} authorDetails - Details of author to be edited to library
 * @returns {promise} Axios http response
 */

export const editAuthor = authorDetails => (
    dispatch => (
        axios.put(`/authors/${authorDetails.id}`, authorDetails)
        .then(response => {
            const {
                message,
                updatedAuthor
            } = response.data;
            dispatch(authorEdited(updatedAuthor));
            dispatch(addFlashMessage({
                type: 'success',
                text: message
            }));
            return response;
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: 'errors.response.data.message-editAuthor'
            }));
            return errors;
        })
    )
);

/**
 * Assign author 
 * @description Makes network request to assign an author to book(s)
 * @param {number} authorId - Id of author to be assigned
 * @param {number} bookId - Id of book to be assigned
 * @returns {promise} Axios http response
 */

export const assignAuthor = ({ authorId, bookId }) => (
    dispatch => (
        axios.post(`/authors/${authorId}/books/${bookId}`, {})
        .then((response) => {
            const {
                message,
                authorBook
            } = response.data
            dispatch(authorAssigned(authorBook));
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
        })
    )
)

/**
 * Delete author
 * @description Makes network request to delete an author
 * @param {object} authorDetails - Details of author to be deleted from library
 * @returns {promise} Axios http response
 */
export const deleteAuthor = authorDetails => (
    dispatch => (
        axios.delete(`/authors/${authorDetails.id}`, authorDetails)
        .then(response => {
            dispatch(deleteAuthor(authorDetails.id));
            dispatch(addFlashMessage({
                type: 'success',
                text: response.data.message
            }));
        })
        .catch(errors => {
            dispatch(addFlashMessage({
                type: 'error',
                text: 'errors.response.data.message-authorDelete'
            }));
            return errors
        })
    )
)