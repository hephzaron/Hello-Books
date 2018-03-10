import mirrorKeys from 'Utils/mirrorKeys';

/**
 * @description An array of page types
 * @type [Array]
 */

const pageTypes = [
    'SEARCH_PAGE',
    'BOOKS_FETCHED_PAGE',
    'AUTHORS_FETCHED_PAGE',
    'GENRES_FETCHED_PAGE'
]

export default mirrorKeys(pageTypes);