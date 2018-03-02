import { combineReducers } from 'redux';
import flashMessage from './flashMessage';
import auth from './userAuth';
import modal from './modal';
import pagination from './pagination';
import authors from './authors';
import books from './books';
import borrowedReturn from './borrowedReturn';
import genres from './genres';

const reducers = combineReducers({
    flashMessage,
    modal,
    pagination,
    auth,
    authors,
    books,
    genres,
    borrowedReturn
});

export default reducers;