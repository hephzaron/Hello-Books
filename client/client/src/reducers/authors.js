import types from 'Actions/types';
import { initialAuthorState } from './initialState';

const {
    SET_AUTHORS,
    AUTHOR_FETCHED,
    ADD_AUTHOR,
    AUTHOR_EDITED,
    AUTHOR_DELETED,
    AUTHOR_ASSIGNED
} = types;

const authors = (state = initialAuthorState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return {
                ...state,
                authors: action.authors
            }
            break;
        case AUTHOR_FETCHED:
            return action.author
            break;
        case ADD_AUTHOR:
            return {
                ...state,
                authors: [
                    ...state.authors, action.author
                ]
            }
            break;
        case AUTHOR_EDITED:
            const authorsAfterEditing = state.authors.map((author) => {
                author.id === action.author.id ? action.author :
                    author
            });
            return {
                ...state,
                authors: authorsAfterEditing
            };
            break;
        case AUTHOR_DELETED:
            const authorsAfterDeletion = state.authors.filter(
                author => author.id !== action.authorId
            )
            return {
                ...state,
                authors: authorsAfterDeletion
            };
            break;
        case AUTHOR_ASSIGNED:
            return {
                ...state,
                authorBooks: [
                    ...state.authorBooks, action.authorBook
                ]
            };
            break;
        default:
            return state
    }
}

export default authors;