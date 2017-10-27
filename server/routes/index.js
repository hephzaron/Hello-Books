const userController = require('../controllers').userController;
const bookController = require('../controllers').bookController;
const genreController = require('../controllers').genreController;
const authorController = require('../controllers').authorController;
const ownerController = require('../controllers').ownerController;
const borrowController = require('../controllers').borrowController;
const bookCount = require('../middlewares').bookCount;
const userCount = require('../middlewares').userCount;
const userSignUp = require('../middlewares').userSignUp;
const membershipVal = require('../middlewares').membershipVal;
const authorize = require('../middlewares').authorize;
//const signInController = require('../middlewares').user;


module.exports = (app) => {
    // Api for users to create account and login to application
    app.post('/api/users/register', userSignUp.signUp, userController.create);
    app.post('/api/users/signin', userController.signIn, authorize.generateJWT);
    //test secure route
    app.post('/api/auth', authorize.verifyUser);
    //logout
    app.post('/api/logout', authorize.logout);

    // add book category
    app.post('/api/genre', authorize.verifyUser, authorize.adminProtect, genreController.create);

    // add books to library
    app.post('/api/books',authorize.verifyUser,authorize.adminProtect, bookController.create);

    // allow users to modify book information
    app.put('/api/books/:bookId', authorize.verifyUser, authorize.adminProtect, bookController.update);

    //create author details
    app.post('/api/authors', authorize.verifyUser, authorize.adminProtect, authorController.create);

    // allocate books to respective author
    app.post('/api/authors/:authorId/books/:bookId', authorize.verifyUser, authorize.adminProtect, ownerController.create);

    //List all books with respective author
    app.get('/api/books/authors', authorize.verifyUser, authorController.authorBooks);

    //view all books in library
    app.get('/api/users/books', authorize.verifyUser, bookController.list);

    //view books by category
    app.get('/api/genre/books', authorize.verifyUser, genreController.list);

    //allow user to delete book record
    app.delete('/api/books/:bookId', authorize.verifyUser, authorize.adminProtect, bookController.delete);

    // allow users to borrow book
    app.post('/api/users/:userId/books/:bookId', authorize.verifyUser, membershipVal.memberVal, userCount.countUserBook,
        bookCount.checkBookCount, borrowController.create);

    // list all borrowed book by users
    app.get('/api/users', authorize.verifyUser, userController.userBooks);

    // enable user to return a book set returned col to true
    app.put('/api/users/:userId/books/:bookId', authorize.verifyUser, borrowController.update);

    // allow users to view unreturned books Add ?returned=false to url
    app.get('/api/users/:userId/books', authorize.verifyUser, userController.retrieveOne);

    //allow user to view all books written by same author
    app.get('/api/authors/:authorId/books', authorize.verifyUser, authorController.retrieveOne);

};