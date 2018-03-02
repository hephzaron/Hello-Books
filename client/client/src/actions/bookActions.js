import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessage';
import cloudinary from 'cloudinary';
import '../config/clodinary';

const {
    SET_BOOKS,
    ADD_BOOK,
    BOOK_DELETED,
    BOOK_EDITED,
    BOOKS_SEARCHED
} = types;

/**
 * Set books
 * @description Sets fetched books to the store
 * @param { array } books - Payload of fetched books
 * @returns { object } Set book action creator
 */

export const setBooks = (books) => ({
    type: SET_BOOKS,
    ...books
});

/**
 * Add book
 * @description Adds a new book to the store
 * @param {object} book - Payload of single book to be added to the store
 * @returns { object } action creator
 */
export const addBook = (book) => ({
    type: ADD_BOOK,
    book
});

/**
 * Book edited
 * @description Sets edited book in the store
 * @param {object} book  - Payload of edited book
 * @returns {object} action creator
 */
export const bookEdited = (book) => ({
    type: BOOK_EDITED,
    book
});

/**
 * Book deleted
 * @description Removes deleted author from the store
 * @param {object} book - Payload of deleted book
 * @returns {object} action creator
 */
export const bookDeleted = (book) => ({
    type: BOOK_DELETED,
    bookId: book.id
});

/**
 * Books searched
 * @description Sets results of searched books to store
 * @param {array} result - Payload of search result
 * @returns  {object} action creator
 */
export const booksSearched = result => ({
    type: 'BOOKS_SERACHED',
    result
})

/**
 * Get books
 * @description Get books from server
 * @param {void} null - no parameter
 * @returns { promise } -Axios http response
 */
export const getBooks = () => (
    dispatch => (
        axios.get('/users/books')
        .then((response) => {
            dispatch(setBooks(response.data.books));
            return response
        })
        .catch((errors) => {
            dispatch(setBooks([]));
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }));
            return errors
        });
    )
)

/**
 * Create book
 * @description Makes newtork request to create a book
 * @param {object} bookDetails - Details of book to be added to library
 * @returns { promise} Axios http reponse
 */

export const createBook = (bookDetails) => (
    dispatch => {
        const {
            fileDir,
            imageDir
        } = bookDetails;
        const newBookDetails = {
            ...bookDetails,
            documentURL: '',
            coverPhotoURL: ''
        };
        return axios.post('/books', newBookDetails)
            .then(response =>
                uploadBookAssets({
                    fileDir,
                    imageDir
                })
                .then(bookAssets =>
                    updateBookAssets({
                        id: response.data.id,
                        documentURL: bookAssets.documentURL,
                        coverPhotoURL: bookAssets.coverPhotoURL
                    })
                    .then(updatedBook => {
                        dispatch(addBook(updatedBook.data.book));
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
                        return errors
                    })
                )
                .catch(errors => {
                    dispatch(addFlashMessage({
                        type: 'error',
                        text: errors.response.data.message
                    }));
                    return errors
                })
            )
    }
)

/**
 * Edit book
 * @description Makes newtork request to edit a book
 * @param {object} bookDetails - Details of book to be edited
 * @returns {promise} Axios http response
 */
export const editBook = (bookDetails) => {
    dispatch => (
        axios.put(`/books/${bookDetails.id}`, bookDetails)
        .then((response) => {
            dispatch(bookEdited(response.data.updatedBook));
            dispatch(addFlashMessage({
                type: 'success',
                text: response.data.message
            }));
            return response;
        })
        .catch((errors) => {
            dispatch(addFlashMessage({
                type: 'error',
                text: errors.response.data.message
            }))
            return errors
        });
    )
}

/**
 * Update book assets
 * @description Makes http request to update book
 * @param {object} book.id - id of book to be updated
 * @returns {promise} Axios http response
 */

export const updateBookAssets = bookDetails => (
    axios.put(`/books/${book.id}`, bookDetails);
);

/**
 * Delete book
 * @description Makes hhtp request to delete a book
 * @param {object} book.id - id of book to be deleted
 * @returns {promise} Axios http response
 */
export const deleteBook = (book) => (
    dispatch => (
        axios.delete(`/books/${book.id}`)
        .then(response => {
            dispatch(bookDeleted(book.id));
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
            return errors
        })
    )
)

/**
 * Upload cover photo
 * @description Uploads cover photo to cloudinary
 * @param {string} imageData - Image local directory on PC
 * @returns {promise} Resolve promise on successful upload
 * @returns {promise} Reject promise if upload fails
 */
export const uploadCoverPhoto = (imageData) => (
    cloudinary.v2.uploader.upload(
        imageData, {
            crop: 'limit',
            width: 250,
            height: 435,
            eager: [{
                width: 125,
                height: 218,
                crop: 'fill',
                format: 'jpg'
            }]
        },
        (error, result) => {
            error ? Promise.reject(new Error('Oops! Photo could not be uploaded')) : null;
            result ? Promise.resolve(result) : null
        }
    )
);

/**
 * Upload book file
 * @description Uploads book file to cloudinary
 * @param {string} bookFile - Pdf file local directory on PC
 * @returns {promise} Resolve promise on successful upload
 * @returns {promise} Reject promise if upload fails
 */
export const uploadBookFile = (bookFile) => (
    cloudinary.v2.uploader.upload(
        bookFile, (error, result) => {
            error ? Promise.reject(new Error('Oops! Book file could not be uploaded ')) : null;
            result ? Promise.resolve(result) : null
        }
    )
);

/**
 * Delete cover photo
 * @description Deletes cover photo from cloudinary
 * @param {string} publicId- publicId of cover photo as obtained from cloudinary
 * @returns {promise} Resolve promise on successful delete
 * @returns {promise} Reject promise if delete fails
 */
export const deleteCoverPhoto = (publicId) => {
    if (publicId) {
        return cloudinary.v2.uploader.destroy(
            publicId, (error, result) => {
                error ? Promise.reject(new Error('Oops! Could not delete photo')) : null
                result ? Promise.resolve(result)
            }
        )
    }
    return Promise.resolve()
}

/**
 * Upload book assets
 * @description Uploads cover photo and book file to cloudinary
 * @param {object} bookAssets - cover photo and file directory on local PC
 * @returns {promise} Resolve promise on successful upload
 * @returns {promise} Reject promise if upload fails
 */

export const uploadBookAssets = (bookAssets) => (
    uploadBookFile(bookAssets.fileDir)
    .then((bookDocument) =>
        uploadCoverPhoto(bookAssets.imageDir)
        .then((photo) =>
            Promise.resolve({
                documentURL: bookDocument.secure_url,
                coverPhotoURL: photo.secure_url
            }))
        .catch(error =>
            Promise.reject(error.message))
    ).catch(error =>
        Promise.reject(error.message));
)

export const searchBooks = title =>
    dispatch =>
    axios.get(`/search?q=${encodeURIComponent(title)}&type=books`)
    .then(response => {
        dispatch(booksSearched(response.data.books));
        return response;
    }).catch(errors => {
        dispatch(booksSearched({}));
        dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
        }));
    });