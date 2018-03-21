import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessage'

const { SET_PAGE, PAGE_FETCHED, SET_PAGER } = types;
const limit = (count, p) => `limit=${count}&offset=${p?p*count: 0}`;
const encode = encodeURIComponent;

export const setPage = ({ page, items }) => ({
    type: SET_PAGE,
    page,
    ...items
});

export const pageFetched = (page) => ({
    type: PAGE_FETCHED,
    page
})

export const setPager = (pager) => ({
    type: SET_PAGER,
    pager
});

export const getBooks = (page) => (
    dispatch =>
    axios.get(`users/books?${limit(10, page)}`)
    .then(response => {
        const { books } = response.data
        dispatch(setPage({ page, books }))
    })
    .catch(errors => {
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    })
)

export const getAuthors = (page) => (
    dispatch =>
    axios.get(`authors/books?${limit(10,page)}`)
    .then(response => {
        const { authors } = response.data
        dispatch(setPage({ page, authors }));
    })
    .catch(errors => {
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    })
)
export const fetchPage = (page, items, onPageChange) => (
    (dispatch, getState) => {
        let { pager } = getState().pagination;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified object
        pager = getPager(items.length, page, 4)

        const { startIndex, endIndex } = pager;

        // get new page of items from items array
        let pageOfItems = items.slice(startIndex, endIndex + 1);

        //call change page function in parent component
        onPageChange(pageOfItems);
        dispatch(setPager(pager));
    }
)

export const getPager = (totalItems, currentPage = 1, pageSize = 5) => {
    //calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 5) {
        //less than 5 total pages show all
        startPage = 1;
        endPage = totalPages;
    } else {
        //more than 5 total pages, calculate start and end pages
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = currentPage + 2;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);
    // return  object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}