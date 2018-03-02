export const initialAuthState = {
    isAuthenticated: false,
    user: {
        userId: 0
    },
};

export const initialModalState = {
    modalType: null
};
export const initialPaginationState = {
    pager: {
        pages: []
    }
}
export const initialBookState = {
    books: []
}
export const initialAuthorState = {
    authors: []
}
export const initialGenreState = {
    genres: []
}
export const initialBorrowedReturnState = {
    borrowedBooks: [],
    userBooks: [],
    returnedBooks: []
}

export default {
    initialAuthState,
    initialModalState,
    initialPaginationState,
    initialBookState,
    initialGenreState,
    initialAuthorState,
    initialBorrowedReturnState
}