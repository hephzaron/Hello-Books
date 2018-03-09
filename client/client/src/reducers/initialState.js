export const initialAuthState = {
    isAuthenticated: true,
    user: {
        userId: 0,
        username: 'username',
        email: 'email@email.com',
        memValue: 'platinum'
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
export const initialCenterPageState = {
    pageType: null
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