/**
 * @description sets all immutable types for pure redux function
 */
import mirrorKeys from 'Utils/mirrorKeys'

const actions = [
    'ADD_FLASH_MESSAGE',
    'REMOVE_FLASH_MESSAGE',
    'SET_CURRENT_USER',
    'UNSET_CURRENT_USER',
    'SHOW_MODAL',
    'HIDE_MODAL',
    'SHOW_CENTER_PAGE',
    'HIDE_CENTER_PAGE',
    'SET_BOOKS',
    'ADD_BOOK',
    'BOOK_DELETED',
    'BOOK_FETCHED',
    'BOOK_EDITED',
    'BORROWED_FETCHED',
    'BOOKS_SEARCHED',
    'SET_BORROWED_BOOKS',
    'BORROWED_RETURNED',
    'BOOK_BORROWED',
    'AUTHOR_ASSIGNED',
    'SET_AUTHORS',
    'AUTHOR_FETCHED',
    'ADD_AUTHOR',
    'AUTHOR_EDITED',
    'AUTHOR_DELETED',
    'SET_GENRES',
    'ADD_GENRE',
    'SET_PAGE',
    'PAGE_FETCHED',
    'SET_PAGER'
]

export default mirrorKeys(actions);