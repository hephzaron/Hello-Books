import axios from 'axios';
import types from 'Actions/types';
import { addFlashMessage } from './flashMessage';

const {
    SET_GENRES,
    ADD_GENRE
} = types;

/**
 * Set Genre
 * @description  Set the book genre in the store
 * @param {array} genres- Payload of genre to dispatch to store
 * @returns {object} action creator 
 */

const setGenres = (genres) => ({
    type: SET_GENRES,
    ...genres
});

/**
 * Add Genre
 * @description Adds a new genre to the store
 * @param {objects} genre - Payload of single genre to add to the store
 * @returns {object}  action creator
 */

const addGenre = (genre) => ({
    type: ADD_GENRE,
    genre
});

/**
 * Fetch Genres
 * @description Sends to server to get genres
 * @param {void} null - No parameter
 * @returns {promise} Axios http response
 */
const fetchGenres = () => (
    dispatch => (
        axios.get('/genre/books')
        .then((response) => {
            dispatch(setGenres(response.data.genres));
            return response;
        })
        .catch((errors) => {
            dispatch(setGenres([]));
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }))
            return errors
        })
    )
)

/**
 * Create Genre
 * @description Sends genre to be persisted to server
 * @param {object} genreDetails - Details of genre to be added to library
 * @returns {promise} Axios http response
 */

const createGenre = (genreDetails) => (
    dispatch => (
        axios.post('/genre', genreDetails)
        .then((response) => {
            const {
                message,
                genre
            } = response.data;
            dispatch(addGenre(genre));
            dispatch(addFlashMessage({
                type: 'success',
                text: response.data.message
            }));
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

export default {
    fetchGenres,
    createGenre,
    setGenres,
    addGenre
}