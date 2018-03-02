import types from 'Actions/types';
import { initialGenreState } from './initialState'

const {
    SET_GENRES,
    ADD_GENRE
} = types;

const genres = (state = initialGenreState, action) => {
    switch (action.type) {
        case SET_GENRES:
            return {
                ...state,
                genres: action.genres
            };
            break;
        case ADD_GENRE:
            return {
                ...state,
                genres: [
                    ...state.genres, action.genre
                ]
            };
            break;
        default:
            return state;
    }
};

export default genres;