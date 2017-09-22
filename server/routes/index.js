const userController = require('../controllers').userController;
const bookController = require('../controllers').bookController;
const genreController = require('../controllers').genreController;
const authorController = require('../controllers').authorController;
const ownerController = require('../controllers').ownerController;
const borrowController = require('../controllers').borrowController;
//const userMiddleware = require('../middlewares').userMiddleware;
//const signInController = require('../middlewares').user;


module.exports = (app) => {
    // Api for users to create account and login to application
    app.post('/api/users/register', userController.create);
    app.post('/api/users/signin', userController.signIn);

    // add book category
    app.post('/api/genre', genreController.create);

    // add books to library
    app.post('/api/books', bookController.create);

    // allow users to modify book information
    app.put('/api/books/:bookId', bookController.update);

    //create author details
    app.post('/api/authors', authorController.create);

    // allocate books to respective author
    app.post('/api/authors/:authorId/books/:bookId', ownerController.create);

    //get owners list
    app.get('/api/owner/book', ownerController.list);

    //view all books in library
    app.get('/api/users/books', bookController.list);

    //view books by category
    app.get('/api/genre/books', genreController.list);
    app.get('/api/books/author', bookController.retrieve);

    // allow users to borrow book
    app.post('/api/users/:userId/books/:bookId', borrowController.create);

    // list all borrowed book by users
    app.get('/api/users', userController.userBooks);

    // enable user to return a book set returned col to true
    app.put('/api/users/:userId/books/:bookId', borrowController.update);

    // all users to view unreturned books Add ?returned=false to url
    app.get('/api/users/:userId/books', userController.retrieveOne);
};