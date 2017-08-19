const booksController = require('../controllers').books;
const signUpController = require('../controllers').user;
const signInController = require('../controllers').signin;


module.exports = (app) => {
    // create new accounts
    app.post('/api/users/signup', signUpController.create);

    // user login api
    app.post('/api/users/signin', signInController.create);

    //allow users to add new books to the library
    app.post('/api/books', booksController.create);

    // allow users to modify book information
    app.get('/api/books/:id', booksController.retrieve);

    // allow users to get all  books in the library
    app.get('/api/books', booksController.list);

    // allow users to borrow book
    app.post('/api/users/userId/books', booksController.create);

    // enable user to return a book
    app.put('/api/users/:userId/books', booksController.create);

    // allow users to create a new book
    app.post('/api/users/:userId/books', booksController.create);

    // all users to access a book by id
    app.get('/api/users/:id/books', booksController.retrieve);


};